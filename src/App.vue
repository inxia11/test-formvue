<template>
  <div id="app">
    <app-aside></app-aside>
    <form @submit.prevent="submit()">
      <div class="privatData">
        <h2>Личные данные</h2>
        <div class="inp">
          <label for="surname">Фамилия:* </label>
          <input type="text" :class="{'invalid': $v.surname.$error}" id="surname" @blur="$v.surname.$touch()" v-model="surname">
        </div>
        <div class="invalidFeedback" v-if="$v.surname.$error">Пожалуйста укажите вашу фамилию</div>
        
        
        <div class="inp">
          <label for="name">Имя:* </label>
          <input type="text" id="name" :class="{'invalid': $v.name.$error}" @blur="$v.name.$touch()" v-model="name">
        </div>
        <div class="invalidFeedback" v-if="$v.name.$error">Пожалуйста укажите ваше имя</div>
        
        

        <div class="inp">
          <label for="fathName">Отчество: </label>
          <input type="text" id="fathName"> 
        </div>

        <div class="inp">
          <div class="bDate">Дата рождения:* </div>
          <div class="date">
            <label class="bDay">день: <input type="text" :class="{'invalid': $v.bDay.$error}" @blur="$v.bDay.$touch()" maxlength="2" v-model="bDay"></label>
            <label class="bMonth">месяц: <input type="text" :class="{'invalid': $v.bMonth.$error}" @blur="$v.bMonth.$touch()" maxlength="2" v-model="bMonth"></label>
            <label class="bYear">год: <input type="text" :class="{'invalid': $v.bYear.$error}" @blur="$v.bYear.$touch()" maxlength="4" v-model="bYear"></label>
          </div>
        </div>
        <div class="invalidFeedback" v-if="!$v.bDay.required && $v.bDay.$dirty">Пожалуйста введите день</div>
        <div class="invalidFeedback" v-if="!$v.bMonth.required && $v.bMonth.$dirty">Пожалуйста введите месяц</div>
        <div class="invalidFeedback" v-if="!$v.bYear.required && $v.bYear.$dirty">Пожалуйста введите год</div>
        <div class="invalidFeedback" v-if="!$v.bDay.between">введен некорректный день</div>
        <div class="invalidFeedback" v-if="!$v.bMonth.between">введен некорректный месяц</div>
        <div class="invalidFeedback" v-if="!$v.bYear.between">введен некорректный год</div>
        
        
        

        <div class="inp">
          <label for="phone">Номер телефона:* </label>
          <input 
            type="tel" 
            name="phone" 
            id="phone" 
            :class="{'invalid': $v.phone.$error}" 
            @blur="$v.phone.$touch()" 
            v-model="phone"
            maxlength="11"
          >
        </div>
        <div class="invalidFeedback" v-if="!$v.phone.startPhone && $v.phone.$dirty">Номер телефона должен начинаться с 7 без пробелов и других символов</div>
        <div class="invalidFeedback" v-if="!$v.phone.minLength">Пожалуйста введите номер телефона полностью</div>
        


        <div class="inp">
          <label for="sex">Пол: </label>
            <button 
              type="button"
              class="sexM"
              :class="{'active' : enabled}"
              @click="enabled = !enabled"
            >мужской</button>
            <button 
              type="button"
              class="sexF"
              :class="{'active' : !enabled}"
              @click="enabled = !enabled"
            >женский</button>
        </div>

        <div class="inp">
          <label>Группа клиента:* </label>
          <select class="clientGroup" multiple v-model="group" @input="$v.group.$touch" :class="{'invalid': $v.group.$error}">
            <option :key="group" :value="group" v-for="group in groupList" >{{ group }}</option>
          </select>
        </div>
        <div class="invalidFeedback" v-if="$v.group.$error">Пожалуйста выберите одну или несколько групп</div>

        <div class="inp">
          <label>Лечащий врач:</label>
          <select v-model="selected">
            <option disabled value="">Выберите один из вариантов</option>
            <option :key="doc" :value="doc" v-for="doc in doctorList" >{{ doc }}</option>
          </select>
        </div>

        <div class="inp">
          <label class="sms" for="sms">Не отправлять смс: <input type="checkbox" id="sms" value="notsms"></label>
        </div>

      </div>
      <br>
      <div class="adress">
        <h2>Адрес</h2>
        <div class="inp">
            <label for="ind">Индекс: </label>
            <input type="text" id="ind"> <br>
        </div>

        <div class="inp">
            <label for="count">Страна: </label>
            <input type="text" id="count"> <br>
        </div>

        <div class="inp">
            <label for="district">Область: </label>
            <input type="text" id="district"> <br>
        </div>

        <div class="inp">
            <label for="city">Город:* </label>
            <input type="text" id="city" :class="{'invalid': $v.city.$error}" @blur="$v.city.$touch()" v-model="city"> <br>
        </div>
        <div class="invalidFeedback" v-if="$v.city.$error">Пожалуйста укажите ваш город</div>

        <div class="inp">
            <label for="street">Улица: </label>
            <input type="text" id="street"> <br>
        </div>
        
        <div class="inp">
            <label for="house">Дом: </label>
            <input type="text" id="house"> <br>
        </div>

      </div>
      <br>
      <div class="passport">
        <h2>Документ удостоверяющий личность</h2>

        <div class="inp">
          <label for="typeDoc">Тип документа:*  </label>
          <select v-model="passportSelected" @input="$v.passportSelected.$touch" :class="{'invalid': $v.passportSelected.$error}">
            <option disabled value="">Выберите один из вариантов</option>
            <option :key="document" :value="document" v-for="document in documentList">{{ document }}</option>
          </select>
        </div>
        <div class="invalidFeedback" v-if="$v.passportSelected.$error">Пожалуйста выберите один из документов удостоверяющих личность</div>


        <div class="inp">
            <label for="serial">Серия: </label>
            <input type="text" id="serial"> <br>
        </div>

        <div class="inp">
            <label for="num">Номер:  </label>
            <input type="text" id="num"> <br>
        </div>
        
        <div class="inp">
            <label for="iss">Кем выдан:  </label>
            <input type="text" id="iss"> <br>
        </div>
        
        <div class="inp">
          <div class="issDate">Дата выдачи:* </div>
          <div class="wrapdate">
            <label class="issDay">день: <input type="text" :class="{'invalid': $v.issDay.$error}" @blur="$v.issDay.$touch()" maxlength="2" v-model="issDay"></label>
            <label class="issMonth">месяц: <input type="text" :class="{'invalid': $v.issMonth.$error}" @blur="$v.issMonth.$touch()" maxlength="2" v-model="issMonth"></label>
            <label class="issYear">год: <input type="text" :class="{'invalid': $v.issYear.$error}" @blur="$v.issYear.$touch()" maxlength="4" v-model="issYear"></label>
          </div>
        </div>
        <div class="invalidFeedback" v-if="!$v.issDay.required && $v.issDay.$dirty">Пожалуйста введите день</div>
        <div class="invalidFeedback" v-if="!$v.issMonth.required && $v.issMonth.$dirty">Пожалуйста введите месяц</div>
        <div class="invalidFeedback" v-if="!$v.issYear.required && $v.issYear.$dirty">Пожалуйста введите год</div>
        <div class="invalidFeedback" v-if="!$v.issDay.between">введен некорректный день</div>
        <div class="invalidFeedback" v-if="!$v.issMonth.between">введен некорректный месяц</div>
        <div class="invalidFeedback" v-if="!$v.issYear.between">введен некорректный год</div>
      </div>

      <div class="prompt">* поле обязательное для заполнения</div>
      <button class="btn" type="submit" :disabled="submitStatus === 'PENDING'">Создать</button>
      <p class="typo__p" v-if="submitStatus === 'OK'">новый клиент успешно создан</p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">пожалуйста проверьте правильность введенных данных</p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">отправка</p>
    </form>
  </div>
</template>

<script>
import { required, between, minLength, numeric} from 'vuelidate/lib/validators'

export default {

  data () {
    return {
      submitStatus: null,
      surname: '',
      name: '',
      selected: '',
      bDay: '',
      bMonth: '',
      bYear: '',
      phone: '',
      doctorList: ['Иванов', 'Захаров', 'Чернышева'],
      enabled: false,
      issDay: '',
      issMonth: '',
      issYear: '',
      groupList: ['VIP', 'Проблемные', 'ОМС'],
      documentList: ['Паспорт', 'Свидетельство о рождении', 'Вод. удостоверение'],
      city: '',
      vipEn: false,
      troubleEn: false,
      omsEn: false,
      passportSelected: '',
      group: ''
      

    }
  },

  methods: {
    submit() {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          


        }, 500)
      }
    }
    
  },
  validations: {
        surname: {
            required,
            
        },
        name: {
            required,
            
        },
        bDay: {
            required,
            between: between(1, 31)

        },
        bMonth: {
            required,
            between: between(1, 12)

        },
        bYear: {
            required,
            between: between(1900, 2020)

        },
        phone: {
            required,
            minLength: minLength(11),
            numeric,
            startPhone: function(first) {
                const phoneNum = /[7]{1}[\d]{10}/;
                return(
                    phoneNum.test(first)
                )
            }
        },
        issDay: {
            required,
            between: between(1, 31)

        },
        issMonth: {
            required,
            between: between(1, 12)

        },
        issYear: {
            required,
            between: between(1900, 2020)

        },
        city: {
            required
          
        },

        group: {
          required
        },

        passportSelected: {
          required
        }





  }
}
</script>

<style lang="sass">
  *
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
    font-size: 15px
    font-weight: 100



  body
    margin: 0


  #app
    display: flex

  h2
    font-size: 25px

  form
    width: 80%
    color: #22746D
    display: flex
    flex-direction: column
    align-items: center
    margin-bottom: 50px

    .privatData
      width: 50%
      

    .adress
      width: 50%

    .passport
      width: 50%


  .inp
    display: flex
    width: 100%
    justify-content: start
    align-items: center
    margin-bottom: 10px
    

  label
    width: 30%

  input
    width: 60%
    height: 25px
    border: none
    border-bottom: 1px solid #C6C6C6
    outline: none
    padding-left: 10px

  .invalid
    border-bottom: 1px solid red


  .invalidFeedback
    color: red
    font-size: 8px
    margin: 10px 0 10px 0
    padding-left: 40%
    


  .clientGroup 
    height: 60px
  




  select
    width: 60%
    height: 25px
    border: 1px solid #C6C6C6
    border-radius: 4px
    outline: none

  .sms 
    display: flex
    align-items: center
    width: 100%

    input
      width: max-content
      margin-left: 20px

  

  .bDate
    width: 30%

  .date
    display: flex
    justify-content: space-between
    width: 60%

    .bDay
      width: 30%
      margin-left: 3px

      input
        width: 30%

    .bMonth
      width: 30%
      input
        width: 30%
        

    .bYear
      width: 40%
      input
        width: 50%
        
  .issDate
    width: 30%

  .wrapdate
    display: flex
    justify-content: space-between
    width: 60%

    .issDay 
      width: 30%
      margin-left: 3px
      input
        width: 30%

    .issMonth
      width: 30%
      input
        width: 30%

    .issYear
      width: 40%
      input
        width: 50%


  .btn
    background: linear-gradient(0deg, #258078, #4AFFEF)

    &:active
      background: #4AFFEF


  button
    height: 40px
    width: 24%
    border-radius: 4px
    outline: none
    border: 0.5px solid #C6C6C6
    margin: 10px 5px 0 5px

    :active 
      box-shadow: inset 1px 1px 2px rgba(0, 0, 0, .5)

  .sexM.active
    background: linear-gradient(0deg, #258078, #4AFFEF)
    color: #fff
    border: 0.5px solid #C6C6C6

  .sexF.active
    background: linear-gradient(0deg, #258078, #4AFFEF)
    color: #fff
    border: 0.5px solid #C6C6C6


    


</style>
