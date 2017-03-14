import { Component } from '@angular/core';
import { AskService } from './ask.service';
import { IQuestion } from './question';

@Component({
    selector: 'pm-app',

    templateUrl: 'app/questions.component.html',
    providers: [AskService]

})
export class AppComponent {

    public static DEACTIVE_QUESTION_CLASS = 'iquestion-wrapper';
    public static ACTIVE_QUESTION_CLASS = 'iquestion-wrapper is-active';

    public static DISPLAY_ANSWER_CLASS = 'iquestion_answer-animation';
    public static HIDE_ANSWER_CLASS = 'iquestion_answer';

    public static LABEL_ANSWER_VIEW = 'View the answer →';
    public static LABEL_ANSWER_HIDE = 'Hide Answer';

    questions: IQuestion[];
    userQuestion: String;
    errorMessage: string;
    
    constructor(private _askService: AskService) {
    }

    searchQuestion(): void {
        this._askService.ask(this.userQuestion)
            .subscribe(questions => this.questions = questions,
            error => this.errorMessage = <any>error);
    }


    showHidenAnswer(question: IQuestion) {
        if( !question.isActive)
            this.showAnswer(question);
        else    
            this.hideAnswer(question);
    }    

    showAnswer(question: IQuestion) {
        if (!question.answer) {
            this._askService.getAnswer(question.number,this.userQuestion)
                .subscribe(answer => question.answer = answer,
                           error => this.errorMessage = <any>error)
                ;
        }
        question.isActive = true;        
    }

    hideAnswer(question: IQuestion) {
        question.isActive = false;
    }

    getQuestionClass(question: IQuestion): String {
        return question.isActive ? AppComponent.ACTIVE_QUESTION_CLASS : AppComponent.DEACTIVE_QUESTION_CLASS;
    }

    getAnswerClass(question: IQuestion): String {
        return question.isActive ? AppComponent.DISPLAY_ANSWER_CLASS : AppComponent.HIDE_ANSWER_CLASS;
    }

    getContent(question: IQuestion): String {
        let content = question.answer ? question.answer.content : '';
        return content;
    }

    getLabelAnwerLink(question: IQuestion) : String{
        return question.isActive?AppComponent.LABEL_ANSWER_HIDE:AppComponent.LABEL_ANSWER_VIEW;
    }

}
