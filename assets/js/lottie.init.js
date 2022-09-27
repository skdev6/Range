;(function($){
    $(window).on('elementor/frontend/init', function(){
        elementorFrontend.hooks.addAction( 'frontend/element_ready/tb_icon_info_block.default', function($scope, $) {
            $scope.find('.lotti_icon_wrap').each(function(index, _el){
                // console.log(_el);
                var getJson = $(this).attr('data-path');
                var lottieAni = lottie.loadAnimation({
                    container:_el,
                    path: getJson,
                    autoplay: true,
                    renderer: 'svg', 
                    loop: true,
                    progressiveLoad: true,
                    rendererSettings: {
                        preserveAspectRatio: 'xMidYMid meet',
                        progressiveLoad: true, 
                    }
                })
                lottieAni.setSubframe(false);
            });

        }); 
    });
})(jQuery);