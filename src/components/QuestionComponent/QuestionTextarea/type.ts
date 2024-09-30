interface IQuestionTextareaProps  {
    title?: string;
    placeholder?: string;

    onChange?: (newProps: IQuestionTextareaProps) => void;
    disabled?: boolean;
}

const QuestionTextareaDefaultProps: IQuestionTextareaProps = {
    title: '多行输入标题',
    placeholder: '请输入内容',
}

export type { IQuestionTextareaProps }
export { QuestionTextareaDefaultProps }
