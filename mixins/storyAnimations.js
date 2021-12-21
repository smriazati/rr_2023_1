export default {
    methods: {
      showPaginationAtBodyEnd() {

        const ScrollTrigger = this.$ScrollTrigger;
        // const body = document.querySelector("main.content");
        const body = this.$refs.wrapper;
        // const bodyH = body.offsetHeight;
        if (body) {
          console.log(body);
          ScrollTrigger.create({
            trigger: body,
            // markers: true,
            start: 'top-=100px top',
            end: `bottom-=${window.innerHeight / 2} bottom`,
            onToggle: (self) => {
              console.log(self.isActive);
              if (!self.isActive) {
                this.isPaginationVisible = true;
              }
            },
          });
        } else {
          // console.log('no height')
          this.isPaginationVisible = true;
        }
      },
    
        setAnim() {
          const gsap = this.$gsap;
          const rows = gsap.utils.toArray("main.content > .row");
          // console.log(rows);

          rows.forEach((row, i) => {

            gsap.set(row, {
              autoAlpha: 0,
            });

            if (i === 0) {
              // first one  no ST
              gsap.to(row, {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                delay: 0.3
              })
            } else if (i === rows.length - 1) {
              // last one has different trigger
              gsap.to(row, {
                autoAlpha: 1,
                y: 0,
                scrollTrigger: {
                  trigger: row,
                  start: `top-=${window.innerHeight / 2 + window.innerHeight / 4} top`,
                  // end: `top-=${window.innerHeight / 8} top`,
                },
              });
            } else {
              gsap.to(row, {
                autoAlpha: 1,
                y: 0,
                scrollTrigger: {
                  // markers: true,
                  trigger: row,
                  start: `top-=${window.innerHeight / 2 + window.innerHeight / 4} top`,
                  end: `top-=${window.innerHeight / 8} top`,
                  scrub: true,
                },
              });
            }

            // img animations 
            const imgs = row.querySelectorAll('figure img');
            if (imgs) {
              imgs.forEach(img => {
                gsap.set(img, {
                  filter: "grayscale(1) brightness(0.3) contrast(3)", 
                  scale: 1.3
                })
                gsap.to(img, {
                  filter: "grayscale(0) brightness(1) contrast(1)", 
                  scale: 1,
                  duration: 0.8,
                  scrollTrigger: {
                    trigger: row,
                    // markers: true,
                    start: `top-=${window.innerHeight / 2 + window.innerHeight / 4} top`,
                  },
                })
              })
            }


            // check for inner rows 
            const innerRows = row.querySelectorAll('.row');
            if (innerRows) {
              innerRows.forEach(innerRow => {
                let left, right;
                if (innerRow.classList.contains('row-reverse')) {
                  console.log('innerRow', innerRow)
                  left = innerRow.lastChild;
                  right = innerRow.firstChild;
                } else {
                  left = innerRow.firstChild;
                  right = innerRow.lastChild;
                }
                gsap.set(left, {
                  // x: '-10vw',
                  autoAlpha: 0
                })
                gsap.set(right, {
                  // x: '10vw',
                  autoAlpha: 0
                })

                if (i === 0) {
                  gsap.to(left, {
                    x: '0vw',
                    duration: 1.3,
                    autoAlpha: 1
                  })
                  gsap.to(right, {
                    x: '0vw',
                    duration: 1.1,
                    autoAlpha: 1
                  })
                } else {
                  gsap.to(left, {
                    x: '0vw',
                    autoAlpha: 1,
                    duration: 1,
                    scrollTrigger: {
                      // markers: true,
                      trigger: row,
                      start: `top-=${window.innerHeight / 2} top`,
                      end: `top top`,
                    },
                  })
                  gsap.to(right, {
                    x: '0vw',
                    autoAlpha: 1,
                    duration: 1,
                    scrollTrigger: {
                      // markers: true,
                      trigger: row,
                      start: `top-=${window.innerHeight / 2} top`,
                      end: `top top`,
                    },
                  })
                }
              })
            }
          });
        },
    }
}