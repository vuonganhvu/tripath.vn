var myApp = {
    body: $("body"),
    header: $(".header"),
    icoHam: $(".icoHamburger"),
    viewMap: $(".viewMap"),
    container: $(".container"),
    popMap: $('.popMap'),
    init: function() {
        this.setFullpage();
        this.setHamburger();
        this.setPopup();
        this.setList();
        this.setProjectHover();
        this.setSlideMilestone();
        this.setSlideMember();
        this.setGlobe();
    },
    setFullpage: function() {
        var self = this,
            container = self.container,
            menuWrap = $(".menuWrap");

        container.fullpage({
            verticalCentered: true,
            anchors: ["intro", "projects", "milestones", "members", "organization"],
            menu: ".menuList",
            responsiveWidth: 1280,
            bigSectionsDestination: "top",
            resize: true,
            scrollOverflow: true,
            normalScrollElements: ".popInner",
            onLeave: function(index, nextIndex, direction) {
                //not intro
                if (nextIndex != 1) {
                    menuWrap.addClass("next");
                } else {
                    menuWrap.removeClass("next");
                }
            }
        });
        $('.goNext .mobile').on("click", function() {
            container.fullpage.moveTo('projects');
        });
    },
    setHamburger: function() {
        var self = this,
            body = self.body,
            header = self.header,
            icoHam = self.icoHam,
            container = self.container,
            popMap = self.popMap;
        var checker = self.checkBreakpoint();

        icoHam.on("click", function() {
            if (popMap.hasClass('active')) {
                popMap.removeClass('active');
                icoHam.removeClass('active');
                body.removeClass("hideY");
            } else {
                header.toggleClass("active");
                body.toggleClass("hideY");
            }
        });
        $(".menuList li, .headerLogo a").on("click", function() {
            setTimeout(function() {
                header.removeClass("active");
                body.removeClass("hideY");
            }, 100);
        });
        $(window).resize(function() {
            setTimeout(function() {
                checker = self.checkBreakpoint();
            }, 500);

            if (checker == "pc") {
                header.removeClass("active");
                body.removeClass("hideY");
                icoHam.removeClass("active");
                popMap.removeClass('active');
            }
            if (popMap.hasClass('active') && checker == "mo") {
                container.fullpage.silentMoveTo('organization');
            }
        });
    },
    checkBreakpoint: function() {
        var breakpoint = window.matchMedia("(min-width:1280px)");
        var checker, breakpointChecker;

        breakpointChecker = function() {
            if (breakpoint.matches === true) {
                checker = "pc";
            } else if (breakpoint.matches === false) {
                checker = "mo";
            }
        };
        breakpoint.addEventListener("change", () => {
            breakpointChecker();
        });
        breakpointChecker();
        return checker;
    },
    setPopup: function() {
        var boxItm = $('.boxItm'),
            pop = $('.pop'),
            popClose = $('.icoPopClose'),
            body = this.body;

        boxItm.on("click", function() {
            $(this).addClass("active").siblings().removeClass('active');
            pop.addClass("active");
            body.toggleClass("hideY");
        });
        popClose.on("click", function() {
            pop.removeClass("active");
            body.removeClass("hideY");
        });
    },
    setList: function() {
        var infoHead = $('.infoHead');

        infoHead.on("click", function() {
            $(this).toggleClass("active");
        });
    },
    setProjectHover: function() {
        var boxItm = $('.boxItm');

        boxItm.mouseenter(function(){
            $(this).addClass("active");
        }).mouseleave(function(){
            var current = $(this);

            current.addClass("onLeave");

            setTimeout(function() {
                current.removeClass("active onLeave");
            }, 150);

        });
    },
    setSlideMilestone: function() {
        var swiperPic, swiperNav;
        var abtArrowL = $('.abtArrowL'),
            abtArrowR = $('.abtArrowR'),
            body = this.body;

        swiperPic = new Swiper('.abtSlide', {
            slidesPerView: 'auto',
            slidesOffsetAfter: 480,
            updateOnWindowResize: true,
            allowTouchMove: false,
            breakpoints: {
                768: {
                    centeredSlides: true
                },
                1280: {
                    spaceBetween: 20,
                    centeredSlides: true,
                }
            }
        });
        swiperNav = new Swiper('.abtNav', {
            slidesPerView: 'auto',
            spaceBetween: 20,
            slidesOffsetAfter: 580,
            slideToClickedSlide: true,
            breakpoints: {
                768: {
                    centeredSlides: true
                },
                1280: {
                    spaceBetween: 56,
                    centeredSlides: true
                }
            },
            on: {
                init: function() {
                    abtArrowL.on('click', function() {
                        swiperNav.slidePrev();
                    });
                    abtArrowR.on('click', function() {
                        swiperNav.slideNext();
                    });
                },
            },
        });

        swiperPic.on('slideChange', function() {
            swiperNav.slideTo(this.activeIndex);
        });

        swiperNav.on('slideChange', function() {
            swiperPic.slideTo(this.activeIndex);
            this.activeIndex > 0 ? abtArrowL.addClass('active') : abtArrowL.removeClass('active');
            swiperNav.isEnd ? abtArrowR.removeClass('active') : abtArrowR.addClass('active');
        });

        $(window).resize(function(){
            if (body.hasClass('fp-viewing-milestones')) {
                swiperPic.update();
                swiperNav.update();
            }
        });
    },
    setSlideMember: function() {
        var swiperMem;
        var dataGroup = 1,
            currentGroup = 1,
            body = this.body;

        swiperMem = new Swiper('.memSlide', {
            slidesPerView: 'auto',
            spaceBetween: 16,
            resistance: false,
            slidesOffsetAfter: 585,
            breakpoints: {
                768: {
                    spaceBetween: 20,
                    slidesOffsetAfter: 685
                },
                1280: {
                    slidesOffsetAfter: 785,
                }
            }
        });

        swiperMem.on('slideChange', function() {
            currentGroup = swiperMem.slides[this.activeIndex].getAttribute('data-group');

            if(dataGroup !== currentGroup) {
                $('[data-group='+dataGroup+']').removeClass('active');
                $('[data-group='+currentGroup+']').addClass('active');
                dataGroup = currentGroup;
            }
        });

        $('.memNavItm').on('click', function(){
            var currentClick = $(this)[0].getAttribute('data-group'),
                toSlide = $('.memItm[data-group='+currentClick+']');

            swiperMem.slideTo(toSlide.first().index());
            swiperMem.update();
        });

        $(window).resize(function(){
            if (body.hasClass('fp-viewing-members')) {
                swiperMem.update();
            }
        });
    },
    setGlobe: function() {
        var self = this,
            viewMap = self.viewMap,
            popMap = self.popMap,
            icoHam = self.icoHam,
            body = self.body,
            container = self.container,
            checker = self.checkBreakpoint();
        var svgGlobe = $('#globe'),
            timer;

        // Set the width and height of the SVG container
        let width = 500;
        let height = 500;
        //drag sensitivity
        const sensitivity = 75;
        const center = [width / 2, height / 2];
        let locations = [];
        let svg = d3.select("#globe")
            .attr("viewBox", '-65 -50 700 500');
        const markerGroup = svg.append('g').attr("class", "globeName");
        let projection = d3.geoOrthographic()
            .scale(260)
            .center([0, 0])
            .rotate([-110, -10])
            .translate([width / 2, height / 2]);
        let path = d3.geoPath().projection(projection);

        const initialScale = projection.scale();
        const linkCenter = [104.341308, 21.25546];
        const link = [
            //TH
            { type: "LineString", coordinates: [
                    linkCenter,
                    [99.792534, 20.478482],
                    [99.586706, 15.303261],
                    [100.5018, 13.7563],
                ] },
            //KR
            { type: "LineString", coordinates: [
                    linkCenter,
                    [97.834030, 30.164126],
                    [103.725456, 40.530502],
                    [115.951320, 43.213183],
                    [126.9780, 37.5665]
                ] },
            //hochiminh
            { type: "LineString", coordinates: [
                    linkCenter,
                    [102.664886, 16.865531],
                    [104.360029, 12.146746],
                    [106.6297, 10.8231]
                ] }
        ];
        let line = d3.line().x((d) => d[0]).y((d) => d[1]).curve(d3.curveBasis);
        let globe = svg.append("circle")
            .attr("fill", "#E9E9E9")
            .attr("stroke", "#fff")
            .attr("stroke-width", "15")
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("r", initialScale);

        let globeBG = svg.append("circle")
            .attr("fill", "none")
            .attr("stroke", "#F2F2F5")
            .attr("stroke-width", "1")
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("r", initialScale + 5);

        //Drag
        svg.call(d3.drag().on('drag', () => {
            const rotate = projection.rotate();
            const k = sensitivity / projection.scale();

            projection.rotate([
                rotate[0] + d3.event.dx * k,
                rotate[1] - d3.event.dy * k
            ])
            path = d3.geoPath().projection(projection);
            svg.selectAll("path").attr("d", path);
            svg.selectAll('.link').attr("d", function(d){ return smoothPath(d)});

            rePoMarkers();
        }));

        drawGlobe();

        function drawGlobe() {
            d3.queue()
                .defer(d3.json, "../resources/js/world-110m.json")
                .defer(d3.json, "../resources/js/locations.json")
                .await((err, world, locationData) => {
                    //map
                    svg.append("g")
                        .attr("class", "countries")
                        .datum(topojson.feature(world, world.objects.land))
                        .append("path")
                        .attr("d", path)
                        .attr("fill", "white");

                    //connect
                    svg.append("g")
                        .attr("class", "connect")
                        .selectAll("path")
                        .data(link)
                        .enter()
                        .append('path')
                        .attr("class", "link")
                        .attr("d", function(d) { return smoothPath(d) })
                        .style("stroke-width", 2)
                        .style('stroke', "#C7C9D9");

                    locations = locationData;

                    drawMarkers();
                })
        };
        function drawMarkers() {
            const markerSvg = markerGroup.selectAll('svg').data(locations);
            const markerCircle = markerGroup.append('g').selectAll('circle').data(locations);

            markerSvg
                .enter()
                .append('g')
                .attr("class", "teamG")
                .attr('data-team', d => "" + d.properties.team)
                .append('svg')
                .merge(markerSvg)
                .attr('x', d => projection(d.coordinatesTxt)[0])
                .attr('y', d => projection(d.coordinatesTxt)[1])
                .attr("class", "teamWrap")
                .attr("width",  d => d.wrap.width)
                .attr("height", d => d.wrap.height)
                .append('text')
                .attr('class', 'teamTxt')
                .attr('fill', '#3C84C6')
                .attr('x', 0)
                .attr('y', 0)
                .attr("font-family", "Maven Pro, sans-serif")
                .attr("font-size", "15px")
                .attr("font-wight", "500")
                .append('tspan')
                .attr('x', 8)
                .attr('dy', "1.2em")
                .text(d => "" + d.properties.name)
                .attr('fill', '#3C84C6')
                .selectAll('.teamTxt')
                .data(d => d.properties.tasks.split(", "))
                .enter()
                .append('tspan')
                .attr("class", "teamInfo")
                .text(d => d)
                .attr("font-family", "Maven Pro, sans-serif")
                .attr("font-size", "7.8px")
                .attr('dy', "1.2em")
                .attr('x', 8)
                .attr('fill', '#555770');
            markerSvg
                .enter()
                .selectAll('.teamWrap')
                .insert("rect",".teamTxt")
                .attr("class", "teamBox")
                .attr("width", 200)
                .attr("height", 200)
                .attr('x', 0)
                .attr('y', 0)
                .attr('fill', 'none')
                .attr('opacity', 0);
            markerCircle
                .enter()
                .append('circle')
                .merge(markerCircle)
                .attr("data-team", d => "" + d.properties.team)
                .attr('cx', d => projection(d.coordinates)[0])
                .attr('cy', d => projection(d.coordinates)[1])
                .attr('r', 7)
                .attr('fill', '#3C84C6')
                .attr('class', d => {
                    return d.properties.team == 'hanoi' ? 'active' : '';
                });

            markerGroup.each(function() {
                this.parentNode.appendChild(this);
            });
        };
        function rePoMarkers() {
            const markerCircle = markerGroup.selectAll('circle').data(locations);
            const markerSvg = markerGroup.selectAll('svg').data(locations);

            markerCircle
                .enter()
                .merge(markerCircle)
                .attr('cx', d => projection(d.coordinates)[0])
                .attr('cy', d => projection(d.coordinates)[1])

            markerGroup.selectAll('circle').each(function(d) {
                const coordinate = d.coordinates;
                const gdistance = d3.geoDistance(coordinate, projection.invert(center));

                if (gdistance > 1.57) {
                    this.classList.add("hide");
                    this.setAttribute('fill', 'none');
                } else {
                    this.classList.remove("hide");
                    this.setAttribute('fill', '#3C84C6');
                }
            });
            markerSvg
                .enter()
                .merge(markerSvg)
                .attr('x', d => projection(d.coordinatesTxt)[0])
                .attr('y', d => projection(d.coordinatesTxt)[1])
                .attr('opacity', d => {
                    const coordinateTxt = d.coordinatesTxt;
                    const gdistanceTxt = d3.geoDistance(coordinateTxt, projection.invert(center));
                    return gdistanceTxt > 1.57 ? '0' : '1';
                });
        }
        function smoothPath(pstr) {
            if (path(pstr) !== null) {
                const sp = path(pstr).replace(/M|Z/, '').split('L').map((d) => d.split(','));
                const value = line(sp);

                return value.includes("NaN") ? "" : value ;
            }
        };
        function rotateGlobe() {
            timer = d3.timer(function() {
                const rotate = projection.rotate();
                const k = sensitivity / projection.scale();

                projection.rotate([
                  rotate[0] - 0.5 * k,
                  rotate[1]
                ]);
                path = d3.geoPath().projection(projection);
                svg.selectAll("path").attr("d", path);
                svg.selectAll('.link').attr("d", function(d){ return smoothPath(d)});
                rePoMarkers();
            }, 100);
        }
        function stopGlobe() {
            if(timer !== undefined ) timer.stop();
        }

        viewMap.on('click', function(){
            popMap.addClass('active');
            icoHam.addClass('active');
            body.addClass("hideY");
            rotateGlobe();
        });
        icoHam.on("click", function() {
            stopGlobe();
        });
        svgGlobe.mouseenter(function(){
            stopGlobe();
        }).mouseleave(function(){
            rotateGlobe();
        });

        if (checker == "pc") {
            setTimeout(function() {
                if (body.hasClass('fp-viewing-organization')) {
                    rotateGlobe();
                }
            }, 500);
        }

        $(window).resize(function() {
            stopGlobe();

            setTimeout(function() {
                checker = self.checkBreakpoint();
            }, 500);

            if (checker == "pc" && body.hasClass('fp-viewing-organization')) {
                rotateGlobe();
            }
        });

        $('.globeName').on('click', 'circle', function() {
            var dataTeam = $(this).data('team');
            $('[data-team='+dataTeam+']').addClass('active').siblings().removeClass('active');
        });
    }
};

$(document).ready(function() {
    myApp.init();
});
