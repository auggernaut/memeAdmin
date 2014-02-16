$(document).ready(function() {
/*    $('div.item').hover(function() {
        $("#" + this.id).append('<span class="delete"><img src="/img/delete.png"/></span>');
    }, function() {
        $('div.item span').remove();
    });*/

    $('img.meme').click(function() {

        var memeid = "#" + this.id;
        $.post("/flag", {memeid: this.id}, function (res) {
            //alert(res);
            $(memeid).remove();
        });


    });
});