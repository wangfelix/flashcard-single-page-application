import React from 'react';
import ReactDOM from 'react-dom';


export class TextEditor extends React.Component {


    render() {
        return (
            <div className={'text-editor-div'}>

                <div className={'tools'}>sdadad</div>
                <textarea className={'text-editor'} type={'text'}>

                </textarea>
            </div>
        );
    }
}