(function () {
    var flagAddress = true;
    var UserId = GetUrlParam('UserId');
    var myCoupons = GetUrlParam('myCoupons');
    var data = [];
    var nowId, nowUserId;

    $('.goBack').click(function () {
        window.history.back()
    })

    //判断是否有网路
    if(!navigator.onLine){
        $('.noNetwork').css('display','flex');
        $('.prizesList').hide();
    } else {
        getList()
    }

    if (UserId == '' || UserId == '${ UserId}' || UserId == undefined) {
        alert("用户验证失败,未获取到UserId！")
        $('.noPrizes').css('display', 'flex');
        $('.prizesList').hide();
    }




    function getList() {
        // $.post('/LotteryApplet/GetPrizes', { userId: UserId }, function (data) {
         $.post('http://www.kcsoft.com.cn:8883/LotteryApplet/GetPrizes', { userId: UserId }, function (data) {
            if (data.State) {
                console.log(data.Data)
                if (data.Data.length == 0) {
                    $('.noPrizes').css('display', 'flex');
                    $('.prizesList').hide();
                } else {
                    if(myCoupons){
                        var myData = data.Data.filter(function (item) {
                            if(item.PrizeType == 1 || item.PrizeType == 2 || item.PrizeType == 3){
                                return true
                            }
                        })
                        createList(myData)
                    }else {
                        createList(data.Data)
                    }

                }
            } else {
                alert(data.Msg)
                //这里报错：输出：data.Msg
            }
        })
    }

    // 拼接奖品列表
    function createList(data){
        var myData = JSON.parse(JSON.stringify(data));
        var listStr = '';
        var button;
        myData.forEach(function (item) {
            var activationClass;
            if (!item.IsReceive) {
                activationClass = 'activation'
                if (item.PrizeType == 1 || item.PrizeType == 2 || item.PrizeType == 3) {
                    button = '立即使用'
                } else {
                    button = '立即领取'
                }

            } else {
                activationClass = 'notActivation'
                if (item.PrizeType == 1 || item.PrizeType == 2 || item.PrizeType == 3) {
                    button = '已使用'
                } else {
                    button = '已领取'
                }
            }

            if (item.PrizeType != 8 && item.PrizeType != 4) {
                if (item.PrizeType == 1) {
                    listStr += '<li class="'+ activationClass +' coupons">' +
                        '<div class="prizesListLeft">'+
                        '<span>￥<span class="couponsNum">88</span></span>' +
                        '</div>' +
                        '<div class="prizesListCenter">' +
                        ' <p class="prizesListLeftTitle">优惠券</p>' +
                        '<p>限测距仪商品使用</p>' +
                        '</div>' +
                        '<button data-id="' + item.Id + '" data-userId="' + item.UserId + '">' + button + '</button>' +
                        '</li>'
                }else if (item.PrizeType == 2) {
                    listStr += '<li class="' + activationClass + ' coupons">' +
                        '<div class="prizesListLeft">' +
                        '<span>￥<span class="couponsNum">128</span></span>' +
                        '</div>' +
                        '<div class="prizesListCenter">' +
                        ' <p class="prizesListLeftTitle">优惠券</p>' +
                        ' <p>限60米蓝色测距仪使用</p>' +
                        ' <p>限激光数显40米卷尺使用</p>' +
                        '<p>限激光数显60米卷尺使用</p>' +
                        '</div>' +
                        '<button data-id="' + item.Id + '" data-userId="' + item.UserId + '">' + button + '</button>' +
                        '</li>'
                } else if (item.PrizeType == 3) {
                    listStr += '<li class="' + activationClass + ' coupons">' +
                        '<div class="prizesListLeft">' +
                        '<span>￥<span class="couponsNum">168</span></span>' +
                        '</div>' +
                        '<div class="prizesListCenter">' +
                        ' <p class="prizesListLeftTitle">优惠券</p>' +
                        ' <p>限60米蓝色测距仪使用</p>' +
                        '<p>限激光数显60米卷尺使用</p>' +
                        '</div>' +
                        '<button data-id="' + item.Id + '" data-userId="' + item.UserId + '">' + button + '</button>' +
                        '</li>'
                } else if (item.PrizeType == 5) {
                    var personInfo;
                    if (item.IsReceive) {
                        personInfo = '<p>' + item.Receiver + '<span class="phone">' + item.ContactNumber + '</span></p>' +
                            '<p>' + item.Address + '</p>'
                    } else {
                        personInfo = '<p>未填写</p>'
                    }

                    listStr += '<li class="' + activationClass + ' physical">' +
                        '<div class="prizesListLeft">'+
                        '<div>'+
                        '<img class="drum" src="/Scripts/images/hollowdrumhammer@3x.png">'+
                        '</div>'+
                        '</div>'+
                        '<div class="prizesListCenter">'+
                        '<p class="prizesListLeftTitle">空鼓锤</p>'+
                        '<p>收货信息：</p>'+
                        personInfo +
                        '</div>'+
                        '<button  data-id="' + item.Id + '" data-userId="' + item.UserId + '">' + button + '</button>' +
                        '</li>'
                } else if (item.PrizeType == 7) {
                    var personInfo;
                    if (item.IsReceive) {
                        personInfo = '<p>' + item.Receiver + '<span class="phone">' + item.ContactNumber + '</span></p>' +
                            '<p>' + item.Address + '</p>'
                    } else {
                        personInfo = '<p>未填写</p>'
                    }

                    listStr += '<li class="' + activationClass + ' physical">' +
                        '<div class="prizesListLeft">' +
                        '<div>' +
                        '<img src="/Scripts/images/laserdominance@3x.png">' +
                        '</div>' +
                        '</div>' +
                        '<div class="prizesListCenter">' +
                        '<p class="prizesListLeftTitle">激光数显60米卷尺测距仪和软件永久使用</p>' +
                        '<p>收货信息：</p>' +
                        personInfo +
                        '</div>' +
                        '<button  data-id="' + item.Id + '" data-userId="' + item.UserId + '">' + button + '</button>' +
                        '</li>'
                } else if (item.PrizeType == 6) {
                    var personInfo;
                    if (item.IsReceive) {
                        personInfo = '<p>' + item.Receiver + '<span class="phone">' + item.ContactNumber + '</span></p>' +
                            '<p>' + item.Address + '</p>'
                    } else {
                        personInfo = '<p>未填写</p>'
                    }

                    listStr += '<li class="' + activationClass + ' physical">' +
                        '<div class="prizesListLeft">' +
                        '<div>' +
                        '<img src="/Scripts/images/greenrangefinder@3x.png">' +
                        '</div>' +
                        '</div>' +
                        '<div class="prizesListCenter">' +
                        '<p class="prizesListLeftTitle">绿色40米激光测距仪和软件永久使用</p>' +
                        '<p>收货信息：</p>' +
                        personInfo +
                        '</div>' +
                        '<button  data-id="' + item.Id + '" data-userid="' + item.UserId + '">' + button + '</button>' +
                        '</li>'
                }
            }
        })
        $('.prizesList ul').html(listStr)
        clickEvent()
    }

    //立即领取、立即使用的事件
    function clickEvent() {
        $('.activation button').click(function () {
            nowId = $(this).data('id');
            nowUserId = $(this).data('userid');
            var item = $(this).parent().attr('class')
            if (item.indexOf('coupons') != -1) {
                //优惠券跳转到商城
                console.log('优惠券')
                window.location.href = '/Products/index?CompanyId=1&UserId=' + nowUserId
            } else if (item.indexOf('physical') != -1) {
                //实物
                $('.bg').show();
                $('.pop').hide();
                $('.popAddress').show();
                $('.pushAddress').show();
            }
        })
    }

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
            if (!personPhone.match(/^(1)\d{10}$/)) {
                alert('请正确输入手机号码')
                flagAddress = true
                return;
            }
            if (personAddress == ''){
                alert('请填写详细地址')
                flagAddress = true
                return;
            }
            console.log(nowUserId)
            console.log(nowId)

            $.post('/LotteryApplet/lingqu', { userId: nowUserId, prizeId: nowId, receiver: personName, address: personAddress, contactNumber: personPhone }, function (data) {
                console.log(data)
                if (data.State) {
                    nowId = null;
                    nowUserId = null;
                    $('.pop').hide();
                    $('.popAddress').show();
                    $('.pushAddress').hide();
                    $('.getAddressIfon').show();
                    $('.ifoName').text(personName);
                    $('.ifoPhone').text(personPhone);
                    $('.ifoAddress').text(personAddress);
                    //领取成功点击确定
                    $('#addressIfoBtn').click(function () {
                        //$('.bg').hide();
                        //$('.pop').hide();
                        //$('.pushAddress').hide();
                        //$('.getAddressIfon').hide();
                        window.location.reload();
                    })
                } else {
                    alert(data.Msg)
                    //这里报错：输出：data.Msg
                }
            })
        }
    })

    //遮罩层被点击时会关闭弹窗
    $('.mask').click(function () {
        nowId = null;
        nowUserId = null;
        var a = $('.getAddressIfon').css('display');
        if (a != 'none') {
            window.location.reload();
        } else {

            $('.bg').hide();
            $('.pop').hide();
            $('.pushAddress').hide();
            $('.getAddressIfon').hide();
        }
    })
    function GetUrlParam(paraName) {
        var url = document.location.toString();
        var arrObj = url.split("?");

        if (arrObj.length > 1) {
            var arrPara = arrObj[1].split("&");
            var arr;

            for (var i = 0; i < arrPara.length; i++) {
                arr = arrPara[i].split("=");

                if (arr != null && arr[0] == paraName) {
                    return arr[1];
                }
            }
            return "";
        }
        else {
            return "";
        }
    }
    $('.bg').bind('touchmove', function (e) {
        e.preventDefault();
    })

}())
