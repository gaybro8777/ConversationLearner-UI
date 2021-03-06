/**
 * Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
 */
import * as React from 'react'
import './Picker.css'
import { IOption } from './APEModels'
import { MatchedOption } from '../../ExtractorResponseEditor/models'
import FuseMatch from '../../ExtractorResponseEditor/FuseMatch'

interface Props {
    matchedOptions: MatchedOption<IOption>[]
    isVisible: boolean
    bottom: number
    left: number
    top: number
    searchText: string
    menuRef: (element: HTMLDivElement) => void
    onClickOption: (option: IOption) => void
}

interface State {
    listRef: React.RefObject<HTMLDivElement>
}

export default class Picker extends React.Component<Props, State> {
    state: State = {
        listRef: React.createRef<HTMLDivElement>()
    }

    componentDidUpdate() {
        if (this.state.listRef.current) {
            this.scrollHighlightedElementIntoView(this.state.listRef.current)
        }
    }

    scrollHighlightedElementIntoView = (resultsElement: HTMLDivElement) => {
        const selectedElement = resultsElement
            ? resultsElement.querySelector('.mention-picker-button--active') as HTMLElement
            : null

        if (selectedElement) {
            selectedElement.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            })
        }
    }

    render() {
        const style: any = {
            left: `${this.props.left}px`,
            top: `${this.props.top}px`,
        }

        return <div
            className={`mention-picker ${this.props.isVisible ? 'mention-picker--visible' : ''}`}
            ref={this.props.menuRef}
            style={style}
        >
            <div className="mention-picker-list" ref={this.state.listRef}>
                {this.props.matchedOptions.length === 0
                    ? <div className="mention-picker-button">No Results</div>
                    : this.props.matchedOptions.map((matchedOption, i) =>
                    <button
                        key={matchedOption.original.id}
                        type="button"
                        className={`mention-picker-button ${(matchedOption as any).highlighted ? 'mention-picker-button--active' : ''}`}
                        onMouseDown={() => this.props.onClickOption(matchedOption.original)}
                    >
                        <FuseMatch matches={matchedOption.matchedStrings} />
                    </button>
                )}
            </div>
        </div>
    }
}