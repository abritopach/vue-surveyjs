<template>
  <div class="surveyContainer">
    
     <v-layout row>
      <v-flex xs12>
        <v-card color="blue-grey darken-2" class="white--text">
          <v-card-title primary-title>
            <div class="headline">Survey Details</div>
            <survey v-if="survey != null" :survey="survey"></survey>
          </v-card-title>
        </v-card>
      </v-flex>
     </v-layout>
  </div>
</template>

<script lang="ts" >

import Vue from 'vue'
import Component from 'vue-class-component';
import { State } from 'vuex-class';
import { SurveyModel } from '../types';
import * as SurveyVue from 'survey-vue';

@Component
export default class SurveyDetails extends Vue {

  survey: any = null;
  @State('selectedSurvey') selectedSurvey: SurveyModel;

  constructor() {
    super();
    // this.getSurveyId();
    this.showSurvey();
  }

  /*
  getSurveyId() {
    console.log(this.$route.params.surveyId);
  }
  */

  showSurvey() {
    // console.log("showSurvey");

  /*
    let surveyJSON = { title: 'Product Feedback Survey Example', showProgressBar: 'top', pages: [
        {
          questions: [{
              type: 'matrix',
              name: 'Quality',
              title: 'Please indicate if you agree or disagree with the following statements',
              columns: [{
                  value: 1,
                  text: 'Strongly Disagree'
                },
                {
                  value: 2,
                  text: 'Disagree'
                },
                {
                  value: 3,
                  text: 'Neutral'
                },
                {
                  value: 4,
                  text: 'Agree'
                },
                {
                  value: 5,
                  text: 'Strongly Agree'
                }
              ],
              rows: [{
                  value: 'affordable',
                  text: 'Product is affordable'
                },
                {
                  value: 'does what it claims',
                  text: 'Product does what it claims'
                },
                {
                  value: 'better then others',
                  text: 'Product is better than other products on the market'
                },
                {
                  value: 'easy to use',
                  text: 'Product is easy to use'
                }
              ]
            },
            {
              type: 'rating',
              name: 'satisfaction',
              title: 'How satisfied are you with the Product?',
              mininumRateDescription: 'Not Satisfied',
              maximumRateDescription: 'Completely satisfied'
            },
            {
              type: 'rating',
              name: 'recommend friends',
              visibleIf: '{satisfaction} > 3',
              title: 'How likely are you to recommend the Product to a friend or co-worker?',
              mininumRateDescription: 'Will not recommend',
              maximumRateDescription: 'I will recommend'
            },
            {
              type: 'comment',
              name: 'suggestions',
              title: 'What would make you more satisfied with the Product?',
            }
          ]
        }, {
          questions: [{
              type: 'radiogroup',
              name: 'price to competitors',
              title: 'Compared to our competitors, do you feel the Product is',
              choices: ['Less expensive', 'Priced about the same', 'More expensive', 'Not sure']
            },
            {
              type: 'radiogroup',
              name: 'price',
              title: 'Do you feel our current price is merited by our product?',
              choices: ['correct|Yes, the price is about right',
                'low|No, the price is too low for your product',
                'high|No, the price is too high for your product'
              ]
            },
            {
              type: 'multipletext',
              name: 'pricelimit',
              title: 'What is the... ',
              items: [{
                  name: 'mostamount',
                  title: 'Most amount you would every pay for a product like ours'
                },
                {
                  name: 'leastamount',
                  title: 'The least amount you would feel comfortable paying'
                }
              ]
            }
          ]
        }, {
          questions: [{
            type: 'text',
            name: 'email',
            title: 'Thank you for taking our survey. Please enter your email address, then press the "Submit" button.'
          }]
        }]
    };
    */

    // https://vuejs.org/v2/guide/reactivity.html
    this.$nextTick(function () {
        let surveyJSON = {
          surveyId: this.selectedSurvey.Id,
          surveyPostId: this.selectedSurvey.PostId
        };

        SurveyVue.StylesManager.applyTheme("default");
        SurveyVue.surveyLocalization.currentLocale = "es";

        this.survey = (window as any)['survey'] = new SurveyVue.SurveyModel(surveyJSON);
        // console.log(SurveyVue.surveyCss.getCss());
        this.survey.css = SurveyVue.surveyCss.getCss();
        // console.log(this.survey);

        // Save survey result when user click complete button.
        this.survey.onComplete.add(function (result: any) {
          console.log(JSON.stringify(result.data));
        });
    })
    
  }

};
</script>
<style>
  .sv_main.sv_default_css {
    width: 100%;
  }

  .sv_body {
    padding: 10px;
  }
</style>