<template>
    <div class="panels-wrapper">
        <div ref="panels" class="panels">
            <section>
                <div class="text-wrapper">
                    <h2>Panel 1</h2>
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sem nibh, tincidunt ut tellus quis, convallis imperdiet arcu. Nullam sed nunc vestibulum, porta lacus sed, euismod tellus. Donec vel metus leo. Curabitur venenatis rhoncus odio, vel interdum ligula rutrum non. Suspendisse egestas bibendum sapien, vitae pellentesque metus semper eu. Sed ut sagittis dui. In hac habitasse platea dictumst. Aenean ut sagittis nibh, sit amet hendrerit nunc. Suspendisse et consequat mauris. Sed iaculis sapien ac ornare ultrices. Quisque mi turpis, semper id accumsan quis, lacinia ut lorem. Sed non vulputate leo, vitae rutrum ante. Phasellus convallis magna sit amet suscipit suscipit.</p>
                </div>
            </section>
            <section>
                <div class="text-wrapper">
                    <h2>Panel 2</h2>
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sem nibh, tincidunt ut tellus quis, convallis imperdiet arcu. Nullam sed nunc vestibulum, porta lacus sed, euismod tellus. Donec vel metus leo. Curabitur venenatis rhoncus odio, vel interdum ligula rutrum non. Suspendisse egestas bibendum sapien, vitae pellentesque metus semper eu. Sed ut sagittis dui. In hac habitasse platea dictumst. Aenean ut sagittis nibh, sit amet hendrerit nunc. Suspendisse et consequat mauris. Sed iaculis sapien ac ornare ultrices. Quisque mi turpis, semper id accumsan quis, lacinia ut lorem. Sed non vulputate leo, vitae rutrum ante. Phasellus convallis magna sit amet suscipit suscipit.</p>
                </div>
            </section>
            <section>
                <div class="text-wrapper">
                    <h2>Panel 3</h2>
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sem nibh, tincidunt ut tellus quis, convallis imperdiet arcu. Nullam sed nunc vestibulum, porta lacus sed, euismod tellus. Donec vel metus leo. Curabitur venenatis rhoncus odio, vel interdum ligula rutrum non. Suspendisse egestas bibendum sapien, vitae pellentesque metus semper eu. Sed ut sagittis dui. In hac habitasse platea dictumst. Aenean ut sagittis nibh, sit amet hendrerit nunc. Suspendisse et consequat mauris. Sed iaculis sapien ac ornare ultrices. Quisque mi turpis, semper id accumsan quis, lacinia ut lorem. Sed non vulputate leo, vitae rutrum ante. Phasellus convallis magna sit amet suscipit suscipit.</p>
                </div>
            </section>
        </div>
    </div>
</template>

<script>

export default {
    mounted() {
        this.$nextTick(this.setAnimation);
    },
    methods: {
        registerPlugins() {
            gsap.registerPlugin(ScrollTrigger);
        },
        setAnimation() {
            this.registerPlugins();
            //   console.log(gsap);

            if (!gsap || !ScrollTrigger) {
                console.log("Cancelling animation, no GSAP or ST exists.");
                return;
            }

        // arrow animations
        console.log('Start animation.')

        const panels = Array.from(this.$refs.panels.querySelectorAll('section'));
            panels.forEach(panel => {
                gsap.set(panel, {
                    autoAlpha: 0
                })
                gsap.to(panel, {
                    autoAlpha: 1,
                    // y: 100, 
                    scrollTrigger: {
                        trigger: panel,
                        // pin: true,   // pin the trigger element while active
                        start: "top top", 
                        end: "50%", 
                        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar,
                        markers: true,
                        pin: true
                    }
                })
            })
        }
    }
}
</script>


<style>

.panels-wrapper {
    background: black;
    color: white;
}
section { 
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 100ch;
    margin: 0 auto;
}
</style>