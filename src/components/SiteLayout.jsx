import * as React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Header from './Header';
import './style.scss';

// markup
const SiteLayout = (props) => {
    return (
        <Scrollbars
            re
            renderTrackHorizontal={(props) => (
                <div {...props} className="track-horizontal" />
            )}
            renderTrackVertical={(props) => (
                <div {...props} className="track-vertical" />
            )}
            renderThumbHorizontal={(props) => (
                <div {...props} className="thumb-horizontal" />
            )}
            renderThumbVertical={(props) => (
                <div {...props} className="thumb-vertical" />
            )}
            renderView={(props) => (
                <div {...props} className={`${props.className} site-layout-scroll`} />
            )}
            style={{ width: '100%', height: '100vh' }}
        >
            <Header />
            <section
                className={['content', props.className]
                    .filter(Boolean)
                    .join(' ')}
            >
                {props.children}
            </section>
        </Scrollbars>
    );
};

export default SiteLayout;
