$(document).ready(function(){
    var bar_height=$(window).height();
    var footer_bar_height=$('footer').height();    
    $('.bar').css('height',bar_height);
    $('.s3').css('height',bar_height);
    $('.s5').css('height',bar_height);
    $('.s6').css('height',bar_height);
    $('footer .bar').css('height',footer_bar_height);
    // 메인 메뉴에 마우스오버했을때 서브배경 슬라이드 다운
    // hover이벤트는 유일하게 마우스오버, 마우스 아웃 이벤트를 다 가지고 있음.
    $('header nav > ul > li').hover(function(){
        $('.sub_bg').stop().slideDown(400);
        $('header').addClass('active'); 
        // 배경이 있을때 메뉴가 색이 나타낫다가 없어져야할때 쓰면됨.
    },
    function(){
        $('.sub_bg').stop().slideUp(400);
        $('header').removeClass('active');
    });
    // window에 스크롤 이벤트 설정 (스크롤 올리면 헤더 투명하게????)
    $(window).scroll(function(){
        var winTop=$(this).scrollTop();
        // 화면이 스크롤이 내려갈때 . 화면이 올라갈때
        if(winTop > 0){
            $('header').addClass('active');
            $('header').css('background-color','white');
            // 메인 메뉴에 마우스오버했을때 서브배경 슬라이드 다운
            // hover이벤트는 유일하게 마우스오버, 마우스 아웃 이벤트를 다 가지고 있음.
            $('header nav > ul > li').hover(function(){
                $('.sub_bg').stop().slideDown(400);
                $('header').css('background-color','white'); 
                // 배경이 있을때 메뉴가 색이 나타낫다가 없어져야할때 쓰면됨.
            },
            function(){
                $('.sub_bg').stop().slideUp(400);
                $('header').css('background-color','white'); 
            });
        // 화면 맨위의 화면이 보일때
        }else{
            $('header').removeClass('active');
            // 메인 메뉴에 마우스오버했을때 서브배경 슬라이드 다운
            // hover이벤트는 유일하게 마우스오버, 마우스 아웃 이벤트를 다 가지고 있음.
            $('header nav > ul > li').hover(function(){
                $('.sub_bg').stop().slideDown(400);
                $('header').addClass('active'); 
                // 배경이 있을때 메뉴가 색이 나타낫다가 없어져야할때 쓰면됨.
            },
            function(){
                $('.sub_bg').stop().slideUp(400);
                $('header').removeClass('active');
            });
        }
    });
    // 메인비주얼 슬라이드
    // .num 의 li에 클릭이벤트 설정 (동그라미 버튼)
    $('.num ul li').click(function(){
        // 클릭한 li 인덱스를 numIndex변수에 저장
        var numIndex=$(this).index();
        console.log(numIndex);

        // 클릭한 번호에  색상 바뀌도록 설정
        // find()는 후손 객체에서 ()안의 객체를 찾아라
        $('.num ul li').find('a').removeClass('active');
        // 클릭한 li의 후손a태그를 찾아서 active클래스 추가
        $(this).find('a').addClass('active');

        // .photo ul li 개수 만큼 반복, each():반복메서드
        $('.photo ul li').each(function(){
            // .photo ul li 의 인덱스번호를 photoIndex변수에 저장
            var photoIndex=$(this).index();
            // 만약 photoIndex와 numIndex가 같다면
            if(photoIndex == numIndex) {
                // 모든 photo ul li는 숨김
                $('.photo ul li').hide();
                // 현재 photo ul li만 보임
                $(this).fadeIn();
            }
        });
        // .des ul li 개수만큼 반복
        $('.des ul li').each(function(){
            // .des ul li의 인덱스번호를 desIndex에 저장
            var desIndex=$(this).index();
            // numIndex값과 desIndex값이 같으면
            if(numIndex == desIndex){
                // 모든 설명 숨김
                $('.des ul li').hide();
                // 현재 활성화된 설명만 보임
                $(this).fadeIn();
            }

        });
    });
    // .btn a 클릭이벤트 설정, .btn a를 클릭하면 자동슬라이드가 멈추고, 다시 클릭하면 자동슬라이드 실행, 버튼 모양도 바뀜
    var sw=0; //스위치변수 명칭..(버튼1개 클릭할때마다 상태가 변할때 사용함)실무에서 많이 사용함
    $('.btn a').click(function(){
        // 만약 sw변수의 값이0이라고 치면sw변수값을 1로수정
        if(sw==0){
            sw=1;
            // 슬라이드 자동실행 멈춤
            clearInterval(auto);
            // .btn a에 active클래스 추가
            $(this).addClass('active');

         //sw변수의 값이 0이 아니면 sw변수의 값을 0으로 초기화   
        }else{
            sw=0;
            //슬라이드 자동실행
            auto=setInterval(fn, 3000);
            // .btn a에 active클래스 제거
            $(this).removeClass('active');


        }
    });
    // .num ul li의 인덱스 번호를 나타내는 변수 선언
    var numLi=0;
    // 자동슬라이스 3초마다 실행
    var auto=setInterval(fn, 3000);
    // 함수 선언
    function fn(){
        // .num ul li의 인덱스번호를 1씩 증가시킴
        numLi += 1;
        // 만약 인덱스번호가 2보다 커지면 0으로 초기화
        if(numLi > 5) { numLi=0;}
        //  numLi인덱스번호에 해당하는 li클릭
        // eq(인덱스번호):인덱스번호에 해당하는 객체 가리킴
        $('.num ul li').eq(numLi).click();
    }


    // 탬메뉴
    $('.product_list ul li a').click(function(){
        $('.product_list ul li a').removeClass('active');
        $(this).addClass('active');
        // li인 자식인axormdml href속성을 막음.
        // e.preventDefault()메서드와 같은 역할임.
        return false;
    });
    $('.t1 a').click(function(){
        $('.visual ul li').hide();
        $('.img1').fadeIn();
    });
    $('.t2 a').click(function(){
        $('.visual ul li').hide();
        $('.img2').fadeIn();
    });
    $('.t3 a').click(function(){
        $('.visual ul li').hide();
        $('.img3').fadeIn();
    });
    // 자동슬라이드(마우스오버했을때 멈춤)
    var swiper =  new Swiper(".mySwiper", {
        slidesPerView: 5, //화면에 보이는 리스트 개수
        spaceBetween: 10,  //리스트의 간격
        loop:true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        }
    });
    // 자동슬라이드에 마우스 오버했을때 멈추고, 마우스 아웃했을 때 다시 자동슬라이드
    $('.swiper').hover(function(){
        swiper.autoplay.stop();
    },function(){
        swiper.autoplay.start();
    });
});