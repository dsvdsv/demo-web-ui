import {Component, OnDestroy, OnInit, OnChanges, ElementRef, Input} from "@angular/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from "@angular/common";
import {Observable} from "rxjs/Observable";
import {Highcharts} from "./highcharts";
import {extend} from "../../common/utils"


@Component({
    selector: 'chart',
    template: '',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass]
})
export class Chart implements OnDestroy, OnChanges, OnInit {

    private chart:HighchartsChartObject;

    private parentNode:HTMLElement;
    private node:HTMLElement;

    @Input() public options:HighchartsOptions;
    @Input() public categories:Observable<string[]>;
    @Input() public series:Observable<HighchartsIndividualSeriesOptions[]>;

    public constructor(private element:ElementRef) {
        this.node = element.nativeElement;
        this.parentNode = this.node.parentElement;
    }

    ngOnDestroy():any {
        if (this.chart) {
            this.chart.destroy();
            this.chart = undefined;
        }
    }

    ngOnChanges(changes:{}):any {
        return undefined;
    }

    ngOnInit():any {


        this.options.chart = extend(
            this.options.chart,
            {
                renderTo: this.element.nativeElement
            }
        );
        this.chart = new Highcharts.Chart(this.options);

        this.resize();
        this.chart.showLoading();

        var resizes = Observable.fromEvent(window, 'resize');

        resizes.subscribe(x => {
            this.resize();
        });


        this.series.subscribe(s => {
            this.categories.subscribe(c => {
                let chart = this.chart;
                let options = this.options;

                chart.hideLoading();

                chart.xAxis.forEach(a => a.remove(false));
                chart.series.forEach(x => x.remove(false));

                chart.addAxis(extend(options.xAxis, {categories: c}), true, true, false);
                s.forEach(x => chart.addSeries(x, false, false));

                chart.redraw();

                this.resize();
            });

        });

    }

    private resize():any {
        if (this.chart) {
            this.chart.setSize(
                this.parentNode.offsetWidth,
                this.parentNode.offsetHeight, false
            );
        }
    }

}