window.onload = function () {
    var banner = document.querySelector('.banner');
    var ulBox = document.querySelector('.ulBox');
    var first = ulBox.querySelector('li:first-of-type');
    var last = ulBox.querySelector('li:last-of-type');
    ulBox.appendChild(first.cloneNode(true));
    ulBox.insertBefore(last.cloneNode(true), ulBox.firstChild);

    var lis = ulBox.querySelectorAll('li');
    var count = lis.length;
    var bannerWidth = banner.offsetWidth;
    ulBox.style.width = count * bannerWidth + 'px';
    for (var i = 0; i < lis.length; i++) {
        lis[i].style.width = bannerWidth + 'px';
    }
    ulBox.style.left = -bannerWidth + 'px';

    var index = 1;
    window.onresize = function () {
        bannerWidth = banner.offsetWidth;
        ulBox.style.width = count * bannerWidth + 'px';
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.width = bannerWidth + 'px';
        }
        ulBox.style.left = -index * bannerWidth + 'px';
    };

    var timerId;
    var imgMove = function () {
        timerId = setInterval(function () {
            index++;
            ulBox.style.transition = 'left .5s';
            ulBox.style.left = -index * bannerWidth + 'px';
            setTimeout(() => {
                if (index == count - 1) {
                    index = 1;
                    ulBox.style.transition = 'none';
                    ulBox.style.left = -index * bannerWidth + 'px';
                }
            }, 500);
        }, 1000);
    };
    imgMove();

    var olMove = function (index) {
        var olLis = document.querySelectorAll('.olBox li');
        for (var i = 0; i < olLis.length; i++) {
            olLis[i].classList.remove('active');
        }
        olLis[index - 1].classList.add('active');
    };

    var startX, moveX, distanceX;
    var flag = true;
    ulBox.addEventListener('touchstart', function (e) {
        clearInterval(timerId);
        startX = e.targetTouches[0].clientX;
    });
    ulBox.addEventListener('touchmove', function (e) {
        if (flag == true) {
            moveX = e.targetTouches[0].clientX;
            distanceX = moveX - startX;
            ulBox.style.transition = 'none';
            ulBox.style.left = (-index * bannerWidth + distanceX) + 'px';
        }
    });
    ulBox.addEventListener('touchend', function (e) {
        flag = false;
        if (Math.abs(distanceX) > 100) {
            if (distanceX > 0) {
                index--;
            } else {
                index++;
            }
            ulBox.style.transition = 'left .5s';
            ulBox.style.left = -index * bannerWidth + 'px';
        } else if (Math.abs(distanceX) > 0) {
            ulBox.style.transition = 'left .5s';
            ulBox.style.left = -index * bannerWidth + 'px';
        }
        startX = 0;
        moveX = 0;
        distanceX = 0;
    });

    ulBox.addEventListener('webkitTransitionEnd',function () {  
        if(index == count - 1){
            index = 1;
            ulBox.style.transition = 'none';
            ulBox.style.left = -index *  bannerWidth + 'px';
        } else if(index == 0) {
            index = count - 2;
            ulBox.style.transition = 'none';
            ulBox.style.left = -index * bannerWidth + 'px';
        }
        olMove(index);
        setTimeout(() => {
            flag = true;
            clearInterval(timerId);
            imgMove();
        }, 100);
    });
};