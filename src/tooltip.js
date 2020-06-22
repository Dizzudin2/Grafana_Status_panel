import _ from 'lodash';
import $ from 'jquery';

export default function tooltip(scope, elem, attrs, ctrl) {

    const panel = ctrl;
    const $tooltip =  $('<div id="tooltip">');

    elem.find('.status-panel').on({
        "mousemove": function(event){
            let body;
            const warn = [];
            const crit = [];
            const ok = [];
            var title = elem.find(".panel-title-text")[0].innerText;

            for (let index = 0; index < ctrl.series.length; index++) {  
                if(parseFloat(ctrl.series[index].display_value) >= ctrl.series[index].thresholds.crit){
                    crit.push(`<astyle="line-height: 1.2">${ctrl.series[index].alias} : ${ctrl.series[index].display_value} <br></a>`)
                }else if (ctrl.series[index].thresholds.warn <= parseFloat(ctrl.series[index].display_value) && parseFloat(ctrl.series[index].display_value) < ctrl.series[index].thresholds.crit){
                    warn.push(`<a style="line-height: 1.2">${ctrl.series[index].alias} : ${ctrl.series[index].display_value}<br></a>`)
                }else if (parseFloat(ctrl.series[index].display_value) < ctrl.series[index].thresholds.warn){
                    ok.push(`<a style="line-height: 1.2">${ctrl.series[index].alias} : ${ctrl.series[index].display_value}<br></a>`)
                }
            }

            if(crit.length !== 0){
                var critItem = crit.join("")
                var Critical = `
                    <div style="padding-bottom: 10px">
                        <a style="color:red; font-weight:bold;">Critical<br></a>
                        ${critItem}
                    </div>
                `
            }else {
                var Critical = ""
            }

            if(warn.length !== 0) {
                var warnItem = warn.join("")
                var Warning = `
                    <div style="padding-bottom: 10px">
                        <a style="line-height: 1.6; color:orange; font-weight:bold;">Warning<br></a>
                        ${warnItem}
                    </div>
                `
            }else{
                var Warning = ""
            }

            if(ok.length !== 0) {
                var okItem = ok.join("")
                var Ok = `
                    <div style="padding-bottom: 10px">
                        <a style="color:green; font-weight:bold;">Ok<br></a>
                        ${okItem}
                    </div>
                `
            }else{
                var Ok = ""
            }

            body = `
            <div class="metric-tooltip">
                <div class="metric-tooltip-time">
                    <h5 style="text-align: center; font-weight:bold;">${title}</h5>
                    ${Critical}
                    ${Warning}
                    ${Ok}
                </div>
            </div>
            `;
            $tooltip.html(body).place_tt(event.pageX + 20, event.pageY );
        }, "mouseleave": function(){
            $tooltip.detach();
        }

    });
}
