var main = function (toDoObjects) {
    "use strict";

    var toDos = toDoObjects.map(function (toDo) {

          return toDo.description;
    });

    $(".tabs a span").toArray().forEach(function (element) {
        var $element = $(element);

        $element.on("click", function () {
            var $content,
                $input,
                $button,
                i;

            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {

                $content = $("<ul>");
                for (var i = toDos.length-1; i >= 0; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }

                $("main .content").append($content);
                $("li").on("click", function() {
                if($(this).hasClass('delete')){
                    $(this).removeClass('delete');
                    $(this).css("color", "black");
                } else {
                    $(this).addClass('delete').css("color","red");
                }
    });

            $button = $("<button>").attr("id","delete").text("Удалить задачи");
            $("main .content").append($button);

            $("button").on("click", function() {
        
        var mass = $(".content li"),
        massText = [];

        mass.toArray().forEach(function(el){
            massText.push(el.textContent);
        });

        var deleteElement = $(".delete");
        var index = toDos.indexOf(deleteElement.text());
        /*console.log(deleteElement.text());
        console.log(massText);
        console.log(index);*/
        console.log("Массив до удаления: "+toDos);
        delete toDos[index];
        $(".delete").remove();

        console.log("Массив после удаления: "+toDos);
    });

            } else if ($element.parent().is(":nth-child(2)")) {
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });
                $("main .content").append($content);

            } else if ($element.parent().is(":nth-child(3)")) {
                var tags = [];

                toDoObjects.forEach(function (toDo) {
                    toDo.tags.forEach(function (tag) {
                        if (tags.indexOf(tag) === -1) {
                            tags.push(tag);
                        }
                    });
                });
                console.log(tags);

                var tagObjects = tags.map(function (tag) {
                    var toDosWithTag = [];

                    toDoObjects.forEach(function (toDo) {
                        if (toDo.tags.indexOf(tag) !== -1) {
                            toDosWithTag.push(toDo.description);
                        }
                    });

                    return { "name": tag, "toDos": toDosWithTag };
                });

                tagObjects.forEach(function (tag) {
                    var $tagName = $("<h3>").text(tag.name),
                        $content = $("<ul>");


                    tag.toDos.forEach(function (description) {
                        var $li = $("<li>").text(description);
                        $content.append($li);
                    });

                    $("main .content").append($tagName);
                    $("main .content").append($content);
                });
                $("main .content").append($content);
            } else if ($element.parent().is(":nth-child(4)")) {
                var $input = $("<input>").addClass("description"),
                    $inputLabel = $("<p>").text("Description: "),
                    $tagInput = $("<input>").addClass("tags"),
                    $tagLabel = $("<p>").text("Tags: "),
                    $button = $("<button>").text("+");

                $button.on("click", function () {
                    var description = $input.val(),
                        tags = $tagInput.val().split(","),
                       
                        newToDo = {"description":description, "tags":tags};
                        console.log(newToDo.tags[0]);
                        toDoObjects.push({"description":description, "tags":tags});
                    $.post("todos", newToDo, function (response) {
                        console.log("We posted and the server responded!");
                    });
                    toDos = toDoObjects.map(function (toDo) {
                        return toDo.description;
                    });

                    $input.val("");
                    $tagInput.val("");
                });

                $content = $("<div>").append($inputLabel)
                                     .append($input)
                                     .append($tagLabel)
                                     .append($tagInput)
                                     .append($button);
                                     $("main .content").append($content);
            }

            
            
            return false;
        });
    });

    $(".tabs a:first-child span").trigger("click");

    // delete 


    
};

$(document).ready(function () {
    $.getJSON("todos.OLD.json", function (toDoObjects) {
        main(toDoObjects);
    });
});
