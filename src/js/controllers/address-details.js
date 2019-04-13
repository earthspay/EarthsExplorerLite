(function () {
    'use strict';

    var NO_TRANSACTIONS_MESSAGE = 'No transactions for this address';
    var NO_ALIASES_MESSAGE = 'No aliases for this address';
    var NO_ASSETS_MESSAGE = 'No assets for this address';
    var NO_DATA_MESSAGE = 'No data transactions for this address';
    var NO_SCRIPT_MESSAGE = 'No script for this address';
    var LOADING_MESSAGE = 'Loading...';

    function AddressDetailsCtrl($http, constants, apiService, aliasService, transactionFormattingService, $stateParams) {
        var ctrl = this;
        ctrl.address = $stateParams.address;
        ctrl.aliases = [];
        ctrl.txs = [];
        ctrl.assets = [];
        ctrl.dataArray = [];
        ctrl.scripts = [];

        ctrl.txsMessage = LOADING_MESSAGE;
        ctrl.aliasesMessage = LOADING_MESSAGE;
        ctrl.assetsMessage = LOADING_MESSAGE;
        ctrl.dataMessage = LOADING_MESSAGE;
        ctrl.scriptsMessage = LOADING_MESSAGE;

        activate();

        function activate() {
            $http.get(apiService.address.balanceDetails(ctrl.address))
                .then(function (response) {
                    ctrl.balance = response.data;
                });
        }

        function postProcessTransaction(tx) {
            switch (tx.type) {
                case constants.EXCHANGE_TRANSACTION_TYPE:
                    tx.amountIn = tx.extras.amount;
                    tx.amountOut = tx.extras.total;
                    tx.sender = tx.extras.from;
                    tx.recipient = tx.extras.to;
                    break;

                case constants.SCRIPT_TRANSFER_TRANSACTION_TYPE:
                    break;

                case constants.MASS_PAYMENT_TRANSACTION_TYPE:
                    if (!tx.outgoing) {
                        var amounts = tx.transfers
                            .filter(function (transfer) {
                                return transfer.recipient === ctrl.address;
                            }).map(function (transfer) {
                                return transfer.amount;
                            });
                        var total = _.reduce(amounts, function (memo, number) {
                            return memo + number;
                        }, 0);

                        var currency = tx.assetId ? Currency.create({id: tx.assetId}) : Currency.EARTHS;
                        tx.amountIn = Money.fromCoins(total, currency);
                    }

                    break;

                default:
                    if (tx.outgoing)
                        tx.amountOut = tx.extras.amount;
                    else
                        tx.amountIn = tx.extras.amount;
            }
        }

        this.loadTransactions = function () {
            $http.get(apiService.transactions.forAddress(ctrl.address))
                .then(function (response) {
                    ctrl.txs = response.data[0];
                    ctrl.txs.forEach(function(item) {
                        item.outgoing = (item.sender === ctrl.address);
                        item.amountIn = {};
                        item.amountOut = {};
                    });

                    return transactionFormattingService.processAmountAndFee(ctrl.txs);
                })
                .then(function () {
                    ctrl.txs.forEach(function (item) {
                        postProcessTransaction(item);
                    });

                    if (ctrl.txs.length === 0)
                        ctrl.txsMessage = NO_TRANSACTIONS_MESSAGE;
                })
                .catch(function () {
                    ctrl.txsMessage = 'Error loading transactions';
                });
        };

        this.loadAssets = function () {
            $http.get(apiService.assets.balance(ctrl.address))
                .then(function (response) {
                    ctrl.assets = response.data.balances
                        .filter(function (assetBalance) {
                            return assetBalance.balance > 0
                        })
                        .map(function (assetBalance) {
                            return {
                                id: assetBalance.assetId,
                                balance: assetBalance.balance,
                                name: assetBalance.issueTransaction.name,
                                decimals: assetBalance.issueTransaction.decimals
                            }
                        });

                    if (ctrl.assets.length === 0)
                        ctrl.assetsMessage = NO_ASSETS_MESSAGE;
                })
                .catch(function (error) {
                    ctrl.assetsMessage = 'Error loading assets balance';
                    console.log(error);
                });
        };

        this.loadAliases = function () {
            $http.get(apiService.aliases.forAddress(ctrl.address))
                .then(function (response) {
                    ctrl.aliases = response.data.data.map(function (alias) {
                        return aliasService.fromDataServices(alias);
                    });

                    if (ctrl.aliases.length === 0)
                        ctrl.aliasesMessage = NO_ALIASES_MESSAGE;
                })
                .catch(function (error) {
                    ctrl.aliasesMessage = 'Error loading aliases';
                    console.log(error);
                });
        };

        this.loadData = function () {
            $http.get(apiService.address.data(ctrl.address))
                .then(function (response) {
                    ctrl.dataArray = response.data;

                    if (ctrl.dataArray.length === 0)
                        ctrl.dataMessage = NO_DATA_MESSAGE;
                })
                .catch(function () {
                    ctrl.dataMessage = 'Error loading address data';
                });
        };

        this.loadScript = function () {
            $http.get(apiService.address.script(ctrl.address))
                .then(function (response) {
                    if (response.data.script) {
                        ctrl.scripts = [{
                            script: response.data.script,
                            scriptText: response.data.scriptText,
                            extraFee: response.data.extraFee
                        }]
                    } else {
                        ctrl.scriptsMessage = NO_SCRIPT_MESSAGE;
                    }
                })
                .catch(function () {
                    ctrl.scriptsMessage = 'Error loading script';
                })
        };
    }

    angular.module('web').controller('AddressDetailsCtrl',
        ['$http', 'constants.transactions', 'apiService', 'aliasService', 'transactionFormattingService',
            '$stateParams', AddressDetailsCtrl]);
})();
