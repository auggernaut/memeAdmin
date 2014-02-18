

$(document).ready(function () {
    /*    $('div.item').hover(function() {
     $("#" + this.id).append('<span class="delete"><img src="/img/delete.png"/></span>');
     }, function() {
     $('div.item span').remove();
     });*/

    $('img.meme').click(function () {

        var memeid = "#" + this.id;
        if($(memeid).hasClass("flag")){
            $.post("/flag", {imgurId: this.id, flag: false}, function (res) {
                $(memeid).removeClass("flag");
            });
        } else {
            $.post("/flag", {imgurId: this.id, flag: true}, function (res) {
                $(memeid).addClass("flag");
            });
        }



    });

    $('#hideFlagged').change(function(){
        if(this.checked) {
            $('.flag').remove();
        }
    })

/*
    $('#container').imagesLoaded(function () {
        $(this).masonry({
            itemSelector: '.item',
            columnWidth: 240
        })
    });*/

    var memes = document.querySelector('#memes');
    imagesLoaded(memes, function() {
        var msnry = new Masonry( memes, {
            itemSelector: '.item'
        });
    });



    function querystring(key) {
        var re=new RegExp('(?:\\?|&)'+key+'=(.*?)(?=&|$)','gi');
        var r=[], m;
        while ((m=re.exec(document.location.search)) != null) r.push(m[1]);
        return r;
    }

    var page = querystring('p');

    $('#pt' + page[0]).addClass("active");
    $('#pb' + page[0]).addClass("active");
});



