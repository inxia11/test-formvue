<template>
    <div class="aside">
        <div class="textAside">
            <div class="hr"></div>
            <div class="text">
                <div class="title">Уважаемый клиент</div>
                <div class="asideCont">для регистрации на сайте заполните, пожалуйста, форму</div>
            </div>
            <div class="hr"></div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>


<style lang="sass" scoped>
    $fontColor: #fff
    *
        font-family: 'Franklin Gothic Medium',  Arial, sans-serif
        


    .aside
        height: 100vh
        width: 20%
        top: 0
        position: sticky
        background: linear-gradient(45deg, #0A2221, #4AFFEF)

    .textAside
        color: $fontColor
        height: 30%
        flex-direction: column
        justify-content: space-between
        display: flex
        margin-top: 70%


    .hr 
        border: 3px solid $fontColor
        width: 30%

    .text
        width: 75%
        margin-left: 20%

    .title 
        font-weight: 400
        font-size: 30px
        margin-bottom: 20px

    .asideCont
        font-weight: 200
        font-size: 15px
        

</style>