var vrImage = function(baseline, img) {
    var baseline = baseline;
    var $image = $('.' + img + '');
    var imageAspectRatio = ($image.width() / $image.height());

    wrapImage($image);

    window.addEventListener('resize', resizeImage);
    resizeImage();

    function wrapImage($image) {
        var $wrap = $('<div class="image-wrap">')
            // .css('overflow', 'hidden');
        $image
            .css('width', 'auto')
            .css('display', 'block');
        $image.after($wrap);
        $wrap.append($image);
    }

    function resizeImage() {
        var newHeight = ($image.parent().width() / imageAspectRatio);
        var leftover = (newHeight % baseline);
        $image.css('height', newHeight + (baseline - leftover));
    }
};