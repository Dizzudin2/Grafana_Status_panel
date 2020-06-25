'use strict';

System.register(['lodash', 'jquery'], function (_export, _context) {
    "use strict";

    var _, $;

    function tooltip(scope, elem, attrs, ctrl) {

        var panel = ctrl;
        var $tooltip = $('<div id="tooltip">');
        elem.find('.status-panel').on({
            "mousemove": function mousemove(event) {
                var body = void 0;
                var warn = [];
                var crit = [];
                var ok = [];
                var title = elem.find(".panel-title-text")[0].innerText;

                for (var index = 0; index < ctrl.series.length; index++) {
                    if (parseFloat(ctrl.series[index].display_value) >= ctrl.series[index].thresholds.crit) {
                        crit.push('<astyle="line-height: 1.2">' + ctrl.series[index].alias + ' : ' + ctrl.series[index].display_value + ' <br></a>');
                    } else if (ctrl.series[index].thresholds.warn <= parseFloat(ctrl.series[index].display_value) && parseFloat(ctrl.series[index].display_value) < ctrl.series[index].thresholds.crit) {
                        warn.push('<a style="line-height: 1.2">' + ctrl.series[index].alias + ' : ' + ctrl.series[index].display_value + '<br></a>');
                    } else if (parseFloat(ctrl.series[index].display_value) < ctrl.series[index].thresholds.warn) {
                        ok.push('<a style="line-height: 1.2">' + ctrl.series[index].alias + ' : ' + ctrl.series[index].display_value + '<br></a>');
                    }
                }

                if (crit.length !== 0) {
                    var critItem = crit.join("");
                    var Critical = '\n                    <div style="padding-bottom: 10px">\n                        <a style="color:red; font-weight:bold;">Critical<br></a>\n                        ' + critItem + '\n                    </div>\n                ';
                } else {
                    var Critical = "";
                }

                if (warn.length !== 0) {
                    var warnItem = warn.join("");
                    var Warning = '\n                    <div style="padding-bottom: 10px">\n                        <a style="line-height: 1.6; color:orange; font-weight:bold;">Warning<br></a>\n                        ' + warnItem + '\n                    </div>\n                ';
                } else {
                    var Warning = "";
                }

                if (ok.length !== 0) {
                    var okItem = ok.join("");
                    var Ok = '\n                    <div style="padding-bottom: 10px">\n                        <a style="color:green; font-weight:bold;">Ok<br></a>\n                        ' + okItem + '\n                    </div>\n                ';
                } else {
                    var Ok = "";
                }

                body = '\n            <div class="metric-tooltip">\n                <div class="metric-tooltip-time">\n                    <h5 style="text-align: center; font-weight:bold;">' + title + '</h5>\n                    ' + Critical + '\n                    ' + Warning + '\n                    ' + Ok + '\n                </div>\n            </div>\n            ';
                $tooltip.html(body).place_tt(event.pageX + 20, event.pageY);
            }, "mouseleave": function mouseleave() {
                $tooltip.detach();
            }

        });
    }

    _export('default', tooltip);

    return {
        setters: [function (_lodash) {
            _ = _lodash.default;
        }, function (_jquery) {
            $ = _jquery.default;
        }],
        execute: function () {}
    };
});
//# sourceMappingURL=tooltip.js.map
