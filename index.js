function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotive()


function logoanimation(){
        gsap.to("#nav1 svg", {
        transform:"translateY(-100%)",
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            start:"top top",
            end:"top -5%",
            scrub: true,
           
    }
    })
}
logoanimation()

function linksanimation(){
     gsap.to("#nav2 #links", {
        transform:"translateY(-100%)",
        opacity:0,
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            start:"top top",
            end:"top -5%",
            scrub: true,
            

        }
    })
}
linksanimation()


function videoAnimation(){

    var video = document.querySelector('#video-container')
    
    var play = document.querySelector("#play")
    
    video.addEventListener("mouseenter",function(){
        gsap.to(play,{
        opacity:1,
        scale:1
        })
    })
    video.addEventListener("mouseleave", function(){
        gsap.to(play, {
            opacity: 0,
            scale: 0.5,
        });
    });
    
    video.addEventListener("mousemove",function(dets){
        gsap.to(play,{
            left:dets.clientX,
            top:dets.clientY
        })
    })
}
videoAnimation()

function loadingAnimation(){
    gsap.from("#page1 h1",{
        y:100,
        opacity:0,
        delay:0.5,
        duration:0.9,
        stagger:0.3
    })
}
loadingAnimation()

function videoplay(){
        gsap.from("#page1 #video-container",{
        scale:0.9,
        opacity:0,
        delay:1,
        duration:2,
    })
}
videoplay()

function cursoranimation(){
    document.addEventListener("mousemove",function(dts){
    gsap.to("#cursor",{
        left:dts.x,
        top:dts.y,
    })
})


document.querySelectorAll(".child").forEach(function(sai){
    sai.addEventListener("mouseenter",function(){
        gsap.to("#cursor",{
            transform:"translate(-50%,-50%) scale(1)",
        });
    });
});
document.querySelectorAll(".child").forEach(function(sai){
    sai.addEventListener("mouseleave",function(){
        gsap.to("#cursor",{
            transform:"translate(-50%,-50%) scale(0)",
        });
    });
});
var cursor = document.querySelector("#cursor")
document.querySelectorAll(".child").forEach(function(saik){
    saik.addEventListener("mouseenter",function(){
        cursor.style.opacity = '0.5';
        cursor.style.zIndex = "3"
    })
})
}

cursoranimation()


var path = `M 120 100 Q 500 100 1300 100`

var opath = `M 120 100 Q 500 100 1300 100`

var string = document.querySelector("#string")

string.addEventListener("mousemove",function(dets){
    path = `M 120 100 Q ${dets.x} ${dets.y} 1300 100`

    gsap.to("#string path",{
        attr:{d:path},
        duration:0.5,
        ease:Power4.easeOut
    })
})

string.addEventListener("mouseleave",function(){
    gsap.to("#string path",{
        attr:{d:opath},
        duration:0.5,
        ease:"elastic.out(1,0.1)"
    })
})