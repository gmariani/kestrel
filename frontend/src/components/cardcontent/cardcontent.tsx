import * as React from 'react';

// interface InjectedCounterProps {
//     value: number;
//     onIncrement(): void;
//     onDecrement(): void;
// }

interface CardContentProps {
    avatarName?: string;
    avatarImage?: string;
    cardTitle?: string;
    cardDescription?: string;
    countViews?: number;
    countComments?: number;
    //children(props: InjectedCounterProps): JSX.Element;
}

class CardContent extends React.Component<CardContentProps> {
    render() {
        return (
            <div className='card--content'>
                <div className='card-content--top'>
                    <div className='card-avatar'>
                        <img className='card-avatar--image' src={this.props.avatarImage} alt='' />
                        <span>{this.props.avatarName}</span>
                    </div>
                </div>
                <div className='card-content--bottom'>
                    <div className='card-copy'>
                        <h1 className='card-copy--title'>{this.props.cardTitle}</h1>
                        <p className='card-copy--description'>{this.props.cardDescription}</p>
                    </div>
                    <div className='card--info'>
                        <span className='card-icon'>
                            <span className='sr-only'>Total views: </span>
                            {this.props.countViews}
                        </span>
                        <span className='card-icon'>
                            <span className='sr-only'>Total comments: </span>
                            {this.props.countComments}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
