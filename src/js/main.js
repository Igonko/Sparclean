$('.estimator_small_option, .estimator_big_option').on('click', (e) => {
    $(e.target).addClass('active').siblings().removeClass('active');
    if($('.bedrooms_options.active').data('num') !== undefined && $('.bathrooms_options.active').data('num') !== undefined && $('.condition_options.active').data('clean') !== undefined && $('.type_options.active').data('room') !== undefined) {

        let bedrooms = Number($('.bedrooms_options.active').data('num'));
        let bathrooms = Number($('.bathrooms_options.active').data('num'));
        let cleanType = Number($('.condition_options.active').data('clean'));
        let timePerBedroom = Number($('.type_options.active').data('room'));
        let timePerBathroom = Number($('.type_options.active').data('bathroom'));
        let price =  Number($('.type_options.active').data('price'));

        const [hourVal, minuteVal, priceVal] = calcFunc(bathrooms, bedrooms, cleanType, timePerBedroom, timePerBathroom, price);

        $('.section_estimator_result_block_price').text('$' + priceVal);
        if(hourVal === 0) {
            $('.section_estimator_result_block_time').text(minuteVal +' minutes');
        } else if (minuteVal === 0) {
            $('.section_estimator_result_block_time').text(hourVal+' hour');
        } else {
            $('.section_estimator_result_block_time').text(hourVal+' hours ' + minuteVal +' minutes');
        }
    }
})

const calcFunc = (bathrooms, bedrooms, cleanType, timePerBedroom, timePerBathroom, price) => {
    const totalTime = ((bedrooms * timePerBedroom) * cleanType / 100) + ((bathrooms * timePerBathroom) * cleanType / 100);
    const totalPrice = Math.round(totalTime / 60 * price);
    let hours;
    let minutes;
    (function() {
        hours = String((totalTime / 60).toFixed(2))
        minutes = Number((Number('0.' + hours.substr(-2)) * 60).toFixed())
        hours =  Number(hours.slice(0, -2))
    })();
    return [hours, minutes, totalPrice];
}

$('.mobile_menu_wrapper').on('click', () => {
    $('.mobile_menu, .section_header_wrapper').toggleClass('active');
})

$('.section_slider_content').slick({
  dots: true,
  arrows: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});
