$('[data-btn="nav_btn"]').on('click', function () {
    $(this).toggleClass('active');
    $('[data-block="nav_block"]').toggleClass('active');
});

$('[data-btn="search_btn"]').on('click', function (event) {
    event.stopPropagation();
    $('[data-block="header_bottom"]').slideToggle();
});



$(document).on('click', '.main-category-block .category-lists ul li', function () {
    let thisX = $(this);
    let data = $(this).attr('data-sub');
    let svg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '<path d="M9 18L15 12L9 6" stroke="#010114" stroke-width="2"/>\n' +
        '</svg>\n';
    if ($(this).attr('data-click') === 'true') {
        $(this).parent().addClass('active');
        $(this).removeClass('active_btn');
        $(this).removeAttr('data-click');
        $(this).parent().find('ul').remove();

    }
    else {
        $(this).parent().find('li').removeClass('active_btn').removeAttr('data-click');
        thisX.addClass('active_btn').attr('data-click',true);
        if (data !== undefined) {
            $('#category-image').remove();

            data = data.replace(/'/g, '"');
            let jsonData = JSON.parse(data);


            $('.main-category-block .category-lists ul').removeClass('active');

            let index = $(thisX).index();
            let indexParent = $(thisX).parent().index();
            let parentContainer = $(thisX).parent().parent().find('ul');
            let left = parentContainer.width()
            let newUl = $('<ul class="active" data-index="'+parseInt(indexParent+1)+'"></ul>');
            if (parentContainer.length) {
                parentContainer.children().eq(index).nextAll('ul').remove()
                if ($(document).width() > 1010) {
                    parentContainer.children().eq(index+1).after(newUl);
                    $('.active').css('left',(left + 32)+"px");
                } else {
                    let v;
                    if (index >= 2) {
                        v = index - 1
                    } else {
                        v = index
                    }
                    parentContainer.children().eq(index).prev('ul').remove()
                    parentContainer.children().eq(v).after(newUl);
                }
            }

            for (let i = 0; i < jsonData.length; ++i) {
                let item = jsonData[i];

                if (!item.hasOwnProperty('name')) {
                    for (let key in item) {
                        if (item.hasOwnProperty(key) && key !== 'name') {
                            let itemJson = JSON.stringify(item[key]);
                            let li = `<li class="category-btn" data-sub='${itemJson}' data-name='${key}'>${key}${svg}</li>`;

                            $('.main-category-block .category-lists .active').append(li);
                        }
                    }
                }
                else {
                    let li = `<li class="category-btn" data-id='${item.id}'>${item.name}</li>`;
                    $('.main-category-block .category-lists .active').append(li);
                }
            }
        }
        else {
            $(this).parent().find('ul').remove();
        }
    }
});





