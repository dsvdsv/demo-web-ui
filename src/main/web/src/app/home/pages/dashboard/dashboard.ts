import {Component, OnInit} from "@angular/core";
import {Chart} from "../../../components/chart/chart";
import {StatisticService} from "../../../services/statistic-service";
import {Observable} from "rxjs/Observable";
import {AmountState, GroupedActionCodes} from "../../../services/models";
import {I18nPluralPipe, I18nSelectPipe} from "@angular/common";


export interface PaymentStateStat{
    state: string,
    count: number,
    precent: number
}

@Component({
    selector: 'dashboard',
    templateUrl: 'app/home/pages/dashboard/dashboard.html',
    providers: [StatisticService],
    directives: [Chart],
    pipes: [I18nPluralPipe, I18nSelectPipe ]
})
export class Dashboard implements OnInit {

    private lineOptions:Observable<HighchartsOptions>;

    private incomeOptions:HighchartsOptions = {
        chart: {
            type: 'area'
        },
        title: {
            text: null
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Сумма'
            },
            visible: false
        },
        xAxis: {
            visible: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y} руб'
        }
    };

    private incomeCategories:Observable<string[]>;
    private incomeSeries:Observable<HighchartsIndividualSeriesOptions[]>;


    private stackedOptions:HighchartsOptions = {
        chart: {
            type: 'spline'
        },
        title: {
            text: null
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Количество'
            }
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}'
        },
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        }
    };
    private stackedCategories:Observable<string[]>;
    private stackedSeries:Observable<HighchartsIndividualSeriesOptions[]>;

    private amountsOptions:HighchartsOptions = {
        chart: {
            type: 'spline'
        },
        title: {
            text: null
        },
        yAxis: {
            min: 0,
            visible: false
        },
        xAxis: {
            visible: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y} руб'
        }
    };
    private amountsCategories:Observable<string[]>;
    private amountsSeries:Observable<HighchartsIndividualSeriesOptions[]>;

    private messageMapping:any = {
        'NO_ERROR': 'Нет ошибок',
        'NO_CARD_DATA': 'Нет ввода карточных данных или возврата с ACS',
        'INVALID_CARD': 'Неверные карточные данные или недостаточно средств',
        'ISSUER_FAILURE': 'Отказ эмитента или МПС в проведении транзакции',
        'ISSUER_LIMIT': 'Cработали лимиты эмитента',
        'ISSUER_NOT_AVAILABLE': 'Эмитент недоступен',
        'FAILURES_OF_SPASIBO': 'Отказы по Спасибо',
        'TROUBLE_ON_ACS': 'Проблемы на ACS эмитента или на стороне DS',
        'WRONG_CODE_ON_ACS': 'Неверный одноразовый код на ACS',
        'UNAVAILABLE_PROCESSING': 'Недоступен процессинг эквайера',
        'REGIONAL_RESTRICTION': 'Региональные ограничения',
        'FRAUD_FAILURE': 'Отказы по фроду',
        'EXCEEDED_PAYMENT_ATTEMPTS': 'Исчерпаны попытки оплаты',
        'BLOCKED_CARD': 'Попытка оплаты заблокированной картой',
        'MERCHANT_BLOCKED': 'Мерчант заблокирован',
        'ORDER_NOT_FOUND': 'Транзакция не найдена',
        'WRONG_SETTINGS': 'Некорректные настроки мерчанта',
        'payment_approved': 'Подтвержденные',
        'payment_declined': 'Отклонены',
        'payment_deposited': 'Завершены',
        'payment_void': 'Отменены',
        'refunded': 'Возвраты',
        'started': 'Созданы',
        'other': '#'
    };

    // private totalOrderCount: Observable<number>;
    // private minOrderAmount: Observable<number>;
    // private maxOrderAmount: Observable<number>;

    private paymentState: Observable<PaymentStateStat[]>;

    constructor(private api:StatisticService) {
    }

    ngOnInit():any {
        let amounts = this.api.getAmounts();
        let actionCodes = this.api.getActionCodes();
        let paymentState = this.api.getPaymentState();

        this.paymentState = paymentState.map(ps => {
            let total = ps
                .map(x=>x.count)
                .reduce((sum, x) => sum + x);
            return ps.map(x=> {
                return {
                    state: x.state,
                    count: x.count,
                    precent: (100 * x.count)/ total
                }
            })
        });

        this.initAmountChart(amounts);
        this.initStackedChart(actionCodes);
        this.initIncomeChart(amounts);

        // this.totalOrderCount = amounts.map(a => a.map(x=>x.count).reduce((sum, x) => sum + x));
        // this.minOrderAmount = amounts.map(a => {
        //     let t = a.map(x=>x.min);
        //     debugger;
        //     Math.min(a.map(x=>x.min))
        // });
        // this.maxOrderAmount = amounts.map(a => Math.max(a.map(x=>x.max)));
    }

    private initAmountChart(amounts:Observable<AmountState[]>):any {
        this.amountsCategories = amounts.map(x => x.map(a => a.date));
        this.amountsSeries = amounts.map(x=> {
            return [
                {
                    name: 'Максимальная сумма заказа',
                    data: x.map(a=>a.max),
                },
                {
                    name: 'Минимальная сумма',
                    data: x.map(a=>a.min),
                },
                {
                    name: 'Средняя сумма заказа',
                    data: x.map(a=>a.avg),
                }
            ]
        });
    }

    private initIncomeChart(amounts:Observable<AmountState[]>):any {
        this.incomeCategories = amounts.map(x => x.map(a => a.date));
        this.incomeSeries = amounts.map(x=> {
            return [{
                name: 'Сумма',
                data: x.map(a=>a.sum),
            }]
        });
    }

    private initStackedChart(actionCodes:Observable<GroupedActionCodes[]>):any {
        this.stackedCategories = actionCodes.map(codes => codes.map(x=>x.time));
        this.stackedSeries = actionCodes.map(codes => {
            var series = [];
            for (var day of codes) {
                for (var code of day.codes) {
                    let name = this.messageMapping[code.name];
                    var s = series
                        .filter(x => x.name == name);
                    if (s.length == 0) {
                        if (code.name == 'NO_ERROR' || code.name == 'NO_CARD_DATA') {
                            series.push({visible: false, name: name, data: [code.count]});
                        } else {
                            series.push({name: name, data: [code.count]});
                        }
                    } else {
                        s[0].data.push(code.count);
                    }
                }
            }
            return series;
        });
    }
}
