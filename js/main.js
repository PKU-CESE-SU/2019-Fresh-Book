$(function() {
    /* 目录 */
    (function () {
        var toc = $("<div/>")
          , lastRank = 0
          , tocID = []
          , tocCount = 0
          , headings = $("h1, h2, h3");
        if (!headings) {
            return;
        }
        headings.each(function(n, t) {
            if (this.classList.contains("no-toc")) {
                return;
            }
            if (!this.id) {
                this.id = "head-auto-" + (++tocCount);
            }
            var thisRank = +this.tagName[1];
            while (thisRank > lastRank) {
                tocID.push(0);
                if (toc.children().length == 0) {
                    toc = $("<li/>").addClass("no-list-style").appendTo($(toc));
                }
                toc = $("<ul/>").appendTo($(toc.children()[toc.children().length - 1] || toc));
                thisRank--;
            }
            while (lastRank > thisRank) {
                tocID.pop();
                toc = toc.parent().parent();
                thisRank++;
            }
            tocID.push(tocID.pop() + 1);
            toc.append($("<li/>").append($("<a/>").attr({
                href: "#" + this.id
            }).text(this.innerText)))
            lastRank = +this.tagName[1];
        });
        while (toc.parent()[0]) {
            toc = toc.parent();
        }
        while (toc.children().length == 1 && (!(toc.children()[0].tagName.toLowerCase() == "li") || toc.children()[0].classList.contains("no-list-style"))) {
            toc = toc.children();
        }
        toc.children().prependTo($(".tocMain").empty());
    })();
});