/// <reference path="../../JS/jquery-1.8.2.js" />
/*
* 自定义 分页控件 url 传参，后台刷新模式
* 4.0
* 1.修改 组切换bug
* 2.添加绿色样式
* 3.修改已有样式，放弃方形显示原则
* 4.添加第一页、最后一页、数据总数、页面总数显示
* 5.添加 ‘bluePager’---小型蓝色
* 6.添加less问价样式编写
* 7.添加‘singleShow’ 属性
*/
(function ($) {
    //分页条控件
    var PageBar = function (elem, opts) {
        var _this = this;
        //默认值
        var defaults = {
            pageIndex: 1,//当前页索引
            recordCount: 1,//列表项总数
            pageSize: 5,//每页数据量
            numberCount: 3,//显示按钮个,当前页面前面3个，后面3个
            showType: 'default',// 分页控件样式控制 ，default--默认样式 棕黄色,'greenPager'---新版绿色，‘bluePager’---宽松小蓝色
            pageCount: 10,//总页数
            showGoBtn: true,//是否显示跳转按钮
            goBtnText: '确定',
            showAll: true,//是否显示总数据数目
            singleShow:false,//当总页数为1时，是否显示分页控件
            submitEvent: function (number) {//提交事件
                this.tip('当前跳转到：' + number);
            },
            async: false,//指示当前控件是否 
            tip: function (str) {//内容提示
                alert(str);
            }
        }
        _this.opts = $.extend({}, defaults, opts);
        _this.elem = elem;
        //计算 总页数
        _this.opts.pageCount = Math.ceil(opts.recordCount / opts.pageSize);
    }
    //方法注册
    PageBar.prototype = {
        //初始化---后台刷新模式
        init: function () {
            var _this = this;
            var opts = this.opts;
            var elem = this.elem;
            //判断是否有数据
            if (opts.recordCount <= 0) {
                return;
            }
            //左侧数字按钮
            this.getLeftNumberBtn();
            //右侧跳转按钮
            if (opts.showGoBtn) {
                this.createRightBtn();
            }
            elem.append(getDivByClass('clear'));
            //设定当前页
            this.setHot(opts.pageIndex);
            //设置样式
            _this.initStyle();

        },
        //初始化样式控制
        initStyle: function () {
            var _this = this;
            var _elem = this.elem;
            var _opts = this.opts;
            //大小风格控制
            if (_opts.showType == 'greenPager')
                _elem.addClass('greenPager');
            else if (_opts.showType == 'bluePager')
                _elem.addClass('bluePager');

            /********Go按钮位置绑定**********/
            var pageBar_Go = _elem.find('.pageBar_Go');
            //总体宽度
            var width = _elem.find('.pageBar_Number').width()
            + pageBar_Go.outerWidth() + 3;
            _elem.width(width);

            //右侧按钮位置
            pageBar_Go.css({
                top: (_elem.height() - pageBar_Go.height()) / 2 + 1
            });

            if (_opts.singleShow) {
                if (_opts.pageCount == 1) {
                    _elem.hide();
                }
            }
        },
        //产生右侧按钮----default 样式
        createRightBtn: function () {
            var _this = this;
            var _opts = this.opts;
            var _elem = this.elem;
            var pageBar_Go = getDivByClass('pageBar_Go');
            var text = getDivByClass('text');
            var leftStr = '共' + _opts.pageCount + '页,去第';
            text.append('<label>' + leftStr + '</label>');
            var txtBoxOuter = $('<label class="textOuter"></label>');
            var txtBox = $('<input type="text" class="goNumberValue"/>');
            txtBox.val(_opts.pageIndex);
            txtBoxOuter.append(txtBox);
            text.append(txtBoxOuter);
            pageBar_Go.append(text);
            text.append('<label>页</label>');
            text.append(getClear());
            //确定按钮
            var goBtn = getSpanByClass('goToNumber');
            goBtn.text(_opts.goBtnText);
            goBtn.on('click', function () {
                _this.goClick();
            });
            pageBar_Go.append(goBtn);
            //显示总数据数目
            if (_opts.showAll) {
                var rightStr = _opts.recordCount + '条数据';
                pageBar_Go.append('<div class="text">' + rightStr + '</div>');
            }
            this.elem.append(pageBar_Go);
        },
        //go按钮事件
        goClick: function () {
            var _this = this;
            var elem = _this.elem;
            var opts = _this.opts;
            //1.获取数字
            var txtBox = elem.find('.goNumberValue');
            var current = txtBox.val();
            var number = parseInt(current);
            if (isNaN(number)) {
                txtBox.val('');
                txtBox.focus();
                opts.tip('亲,输入的不是数字');
            } else {
                //上限、下线 判断
                if (number < 0) {
                    opts.tip('请输入正整数...');
                    txtBox.focus();
                    txtBox.val('');
                    return false;
                } else if (number < 1) {
                    opts.tip('亲，已经是第1页了');
                    return false;
                } else if (number > opts.pageCount) {
                    opts.tip('亲，筛选结果总共' + opts.pageCount + '页');
                    txtBox.focus();
                    txtBox.val('');
                    return false;
                }
                if (opts.async) {

                } else {
                    //判断要跳转页是否是当前页
                    if (_this.getPageIndex() == number)
                        return false;
                    elem.attr('pageindex', number);
                    opts.submitEvent();
                }
            }
        },
        //产生左侧按钮
        getLeftNumberBtn: function () {
            var _this = this;
            var elem = _this.elem;
            var opts = _this.opts;

            var pageBar_Number = getDivByClass('pageBar_Number');
            //左移动按钮
            var arrowLeft = $('<span class="arrowLeft"/>');
            arrowLeft.append('<em class="arrow-left"/>');
            arrowLeft.click(function () {
                _this.goToLeft();
            });
            pageBar_Number.append(arrowLeft);
            //总 显示第一页
            pageBar_Number.append(_this.createNumber(1));
            if (opts.pageCount != 1)
            {
                //更多...
                var moreLeft = $('<span class="moreLeft"/>');
                moreLeft.text('...');
                pageBar_Number.append(moreLeft);

                //中间数字
                this.generageNumberBtn(pageBar_Number);

                //更多...
                var moreRight = $('<span class="moreRight"/>');
                moreRight.text('...');
                pageBar_Number.append(moreRight);
                //总显示最后一页(如果最后一页不是1)

                pageBar_Number.append(_this.createNumber(opts.pageCount, 'last'));
            }
          

            //右移动按钮
            var arrowRight = $('<span class="arrowRight" />');
            arrowRight.append('<em class="arrow-right"/>');
            arrowRight.click(function () {
                _this.goToRight();
            });
            pageBar_Number.append(arrowRight);
            pageBar_Number.append(getClear());
            _this.elem.append(pageBar_Number);


            //控制更多显示
            var numberList = _this.elem.find('.number');
            //1.左侧
            var leftDif = numberList.eq(1).attr('data-value') - numberList.eq(0).attr('data-value');
            if (leftDif == 1) {
                _this.elem.find('.moreLeft').hide();
            }
            //2.右侧
            var rightDif = numberList.last().attr('data-value') - numberList.eq(numberList.length - 2).attr('data-value');
            if (rightDif == 1) {
                _this.elem.find('.moreRight').hide();
            }
        },
        //指定活动页
        setHot: function (number) {
            if (this.opts.async) {
            } else {
                this.elem.attr('pageindex', number);
                var curNumber = this.elem.find('.number[data-value=' + number + ']');
                curNumber.addClass('Hot');
            }
        },
        //产生数字按钮
        generageNumberBtn: function (pageBar_Number) {
            var _this = this;
            var opts = this.opts;
            var pageIndex = _this.getPageIndex();
            var pageCount = opts.pageCount - 1;
            var startNumber = pageIndex - opts.numberCount;
            var stopNumber = pageIndex + opts.numberCount;
           


            //处理开始值
            startNumber = startNumber < 2 ? 2 : startNumber;
            //处理结束值
            stopNumber = stopNumber > pageCount ? pageCount : stopNumber;

            //开始值 比较 pageIndex
            var spanLeft = pageIndex + 1 - startNumber;
            spanLeft = Math.abs(spanLeft);
            if (spanLeft < opts.numberCount) {
                stopNumber += opts.numberCount - spanLeft
            }

            //结束值 比较 pageCount
            var spanRight = stopNumber + 1 - pageIndex;
            spanRight = Math.abs(spanRight);
            if (spanRight < opts.numberCount) {
                startNumber -= opts.numberCount - spanRight;
            }

            for (var i = startNumber; i <= stopNumber; i++) {
                if (i >= opts.pageCount || i <= 1)
                    continue;
                pageBar_Number.append(_this.createNumber(i));
            }
        },
        //获取number 项
        createNumber: function (i, cla) {
            var _this = this;
            var number = getSpanByClass('number');
            number.text(i).attr('data-value', i);
            number.bind('click', { thisObj: _this }, eventData.numberClick);
            if (cla) {
                number.addClass(cla);
            }
            return number;
        },
        //上一页
        goToLeft: function () {
            var _this = this;
            var current = _this.getPageIndex();
            current -= 1;
            _this.goToNumber(current);
        },
        //下一页
        goToRight: function () {
            var _this = this;
            var current = _this.getPageIndex();
            current += 1;
            _this.goToNumber(current);
        },
        //跳转到指定页
        goToNumber: function (number, isSubmit) {
            var elem = this.elem;
            var opts = this.opts;
            var maxNumber = this.getMaxNumber();
            var minNumber = this.getMinNumber();
            //刷新模式
            if (opts.async) {

            } else {
                //非异步模式
                if (number > opts.pageCount) {
                    opts.tip('亲，没有下一页了');
                    return false;
                } else if (number < 1) {
                    opts.tip('亲，没有上一页了');
                    return false;
                }
            }
            //设置结果
            elem.attr('pageindex', number);

            //提交事件触发
            if (isSubmit == false)
                return;
            opts.submitEvent(number);
        },
        //获取当前组最大项数字
        getMaxNumber: function () {
            var last = this.elem.find('.pageBar_Number .number').last();
            var maxStr = last.attr('data-value');
            var max = parseInt(maxStr);
            if (isNaN(max))
                return this.opts.pageCount;
            return max;
        },
        //获取当前组最小项数字
        getMinNumber: function () {
            var first = this.elem.find('.pageBar_Number .number').first();
            var minStr = first.attr('data-value');
            var min = parseInt(minStr);
            if (isNaN(min))
                return 1;
            return min;
        },
        //获取当前活动页，数值
        getPageIndex: function () {
            var currentStr = this.elem.attr('pageindex');
            var current = parseInt(currentStr);
            if (isNaN(current))
                return parseInt(this.opts.pageIndex);
            return current;
        }
    }

    //绑定的事件集合
    var eventData = {
        //数字按钮事件
        numberClick: function (e) {
            var _this = e.data.thisObj;
            var number = parseInt($(this).attr('data-value'));
            var current = _this.getPageIndex();
            if (number == current)
                return false;
            _this.goToNumber(number);
        }
    }

    //获取div,指定class=clear
    function getClear() {
        return getDivByClass('clear');
    }
    //获取div，指定class
    function getDivByClass(name) {
        var div = $('<div />');
        div.addClass(name);
        return div;
    }
    //获取span，指定class
    function getSpanByClass(name) {
        var span = $('<span />');
        span.addClass(name);
        return span;
    }



    $.fn.pageBar = function (options) {
        var bar = new PageBar(this, options);
        bar.init();
        return bar;
    }
})(jQuery);
