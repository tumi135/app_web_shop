(function () {
    if(!navigator.onLine){
        $('.noNetwork').css('display','flex');
        $('.prizesList').hide();
    }
    var flag = true;
    var flagAddress = true;
    var swiperUlTop = 0;
    var prizeId = null; //奖品Id

    var swiperLiLen = $("#swiperUl>li").length
    var timerSwiper = setInterval(roll, 3000)
    function roll() {
        $("#swiperUl").animate({top: (swiperUlTop) * -1.2 + "rem" }, 1500,"linear", function () {
            swiperUlTop ++
            if(swiperUlTop === (swiperLiLen)){
                $("#swiperUl").css({top: "0px"})
                swiperUlTop = 0
            }
        })
    }

    //点击开始抽奖,向后台获取抽奖信息
    $('.goToDrawContent').off('click').click(function () {
        if(flag){
            flag = false;
            $.get("https://www.easy-mock.com/mock/5ad4d4a7fee5f813106170ec/example/memmem", function (data) {
                var dataIfo = data.data
                goToRun(parseInt(dataIfo.a))
            })
            $.post("http://app.kcsoft.com.cn/LotteryApplet/Index",{userId: xx}, function (data) {
                goToRun(data)
            })
        }
    })

    //遮罩层被点击时会关闭弹窗
    $('.mask').click(function () {
        var voice = $('.popVoice').css('display');
        var copyright = $('.popCopyright').css('display');
        if(voice !== 'none' || copyright !== 'none'){
            alert('立即使用')
            //点击领取，激活
            $('.bg').hide();
            $('.pop').hide();
            $('.box').rotate({angle: 0})
        }else {
            $('.bg').hide();
            $('.pop').hide();
            $('.box').rotate({angle: 0})
        }
    })

    //无抽奖次数
    $('.popNoNumber button').click(function () {
        $('.bg').hide();
        $('.pop').hide();
    })

    //实物奖点击领取
    $('.popLaserBtn, .popDrumBtn, .popGreenBtn').click(function () {
        $('.pop').hide();
        $('.popAddress').show();
        $('.pushAddress').show();
    })

    //优惠券点击使用
    $('.popCoupons88Btn, .popCoupons128Btn, .popCoupons168Btn').click(function () {
        console.log('优惠券点击使用')
    })

    //语音播报永久使用
    $('.popVoiceBtn').click(function () {
        console.log('语音播报永久使用')
    })

    //软件使用权1个月
    $('.popCopyrightBtn').click(function () {
        console.log('软件使用权1个月')
    })


    //确地收货地址
    $("#postAddress").off('click').click(function () {
        var personName = $("#personName").val();
        var personPhone = $("#personPhone").val();
        var personAddress = $("#personAddress").val();
        if(flagAddress){
            flagAddress = false
            console.log(personPhone.length)
            if(personName == ''){
                alert('请填写联系人姓名')
                flagAddress = true
                return;
            }
            if(personPhone == ''){
                alert('请填写联系人电话')
                flagAddress = true
                return;
            }
            if(personPhone.length !== 11){
                alert('请正确输入手机号码')
                flagAddress = true
                return;
            }
            if (personAddress == ''){
                alert('请填写详细地址')
                flagAddress = true
                return;
            }
            $('.pop').hide();
            $('.popAddress').show();
            $('.pushAddress').hide();
            $('.getAddressIfon').show();
        }
    })

    //领取成功点击确定
    $('#addressIfoBtn').click(function () {
        $('.bg').hide();
        $('.pop').hide();
        $('.pushAddress').hide();
        $('.getAddressIfon').hide();
    })


    //计算角度,开始转
    function goToRun(number) {
        number = 0
        // var number = parseInt(9*Math.random());
        console.log(number)
        var prizeIfo = {}
        var oAngle, prizeClass;
        switch (number) {
            //激光数显60米卷尺测距仪和软件永久使用
            case 0:
                prizeIfo = {
                    oAngle: 45,
                    prizeClass: 'popLaser'
                };
                break;
            //内购优惠券88
            case 1:
                prizeIfo = {
                    oAngle: 0,
                    prizeClass: 'popCoupons88'
                };
                break;
            //语音播报增值功能
            case 2:
                prizeIfo = {
                    oAngle: -45,
                    prizeClass: 'popVoice'
                };
                break;
            //内购优惠券128
            case 3:
                prizeIfo = {
                    oAngle: -90,
                    prizeClass: 'popCoupons128'
                };
                break;
            //空鼓锤
            case 4:
                prizeIfo = {
                    oAngle: -135,
                    prizeClass: 'popDrum'
                };
                break;
            //内购优惠券168
            case 5:
                prizeIfo = {
                    oAngle: -180,
                    prizeClass: 'popCoupons168'
                };;
                break;
            //绿色40米激光测距仪和软件永久使用
            case 6:
                prizeIfo = {
                    oAngle: -225,
                    prizeClass: 'popGreen'
                };
                break;
            //软件使用权1个月
            case 7:
                prizeIfo = {
                    oAngle: -275,
                    prizeClass: 'popCopyright'
                };
                break;
            case 8:
                prizeIfo = {
                    oAngle: null,
                    prizeClass: 'popNoNumber'
                };
                break;
        }
        if(prizeIfo.oAngle == null){
            flag = true;
            $('.bg').show();
            $('.' + prizeIfo.prizeClass).show();
        }else {
            $('.box').rotate({animateTo: (-2880 + prizeIfo.oAngle), duration: 4000, callback: function () {
                    setTimeout(function () {
                        flag = true;
                        $('.bg').show();
                        $('.' + prizeIfo.prizeClass).show();
                        clearTimeout()
                    },1500)
                }})
        }
    }
}())
