<template>
    <footer ref="warning" class="landing-page-footer">
        <div class="text-wrapper">
            <p class="small muted">
                Some material in this exhibit is sensitive and deals with violence,
                antisemitism, racism, and death. Please take breaks and reach out to
                your teacher or counselor for support as needed.
            </p>
        </div>
        <div class="logo-wrapper">
            <ul>
                <li><a href="https://his.uncg.edu/" target="_blank"><img src="/logos/uncg.png"
                            alt="UNC Greensboro logo" /></a></li>
                <li><a href="https://www.dpi.nc.gov/districts-schools/classroom-resources/academic-standards/programs-and-initiatives/nc-council-holocaust"
                        target="_blank"><img src="/logos/nccouncilholocaust.jpeg"
                            alt="North Carolina Council on the Holocaust logo" /></a></li>
            </ul>
        </div>
    </footer>
</template>
<style lang="scss">
.landing-page-footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    >* {
        margin: 8px 0;

        &:not(:last-child) {
            margin-right: 1rem;
        }
    }

    @media (min-width: $collapse-bp) {
        position: fixed;
        bottom: 0;
        left: 0;
    }

    @media (max-width: $collapse-bp) {
        margin-top: 30px;
    }

    width: 100%;
    background: $gray;
    z-index: 112;

    .text-wrapper {
        max-width: unset;
        margin: unset;

        @media (max-width: 1390px) {
            flex: 0 0 50ch;
        }
    }

    p {
        color: $white;
        font-size: 14px;
        line-height: 20px;
    }

    ul {
        list-style: none;
    }

    .logo-wrapper {
        ul {
            display: flex;

            >*:not(:last-child) {
                margin-right: 2rem;
            }
        }

        img {
            max-height: 50px;
        }
    }
}
</style>