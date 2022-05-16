import * as React from 'react';
import SiteLayout from '../components/SiteLayout';
import './index.scss';
import Icon from '../components/icon/Icon';
import Lines from '../components/backgrounds/Lines';
// markup
const summary = (
    <div className="block summary" id="summary">
        <a
            href="https://www.linkedin.com/in/fcondej/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
        >
            <Icon iconName="linkedin-squared" className="linkedin"></Icon>
        </a>
        <main>
            <figure
                className="jf-logo"
                tabIndex="0"
                aria-label="Juan Carlos Fernández"
            >
                <span>JF</span>
            </figure>

            <h2 className="name">Juan Carlos Fern&aacute;ndez</h2>
            <strong>Frontend Engineer</strong>
        </main>
        <Lines />
    </div>
);

const professionalExperience = (
    <section className="block experience" id="experience">
        <a href="#experience">
            <h2 className="section-title">Experience</h2>
        </a>
        <main>
            <article>
                <header>
                    <aside>Current position</aside>
                    <aside>Berlin</aside>
                    <a
                        href="https://www.miro.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Miro
                    </a>
                </header>
                <p>Sr. Frontend Engineer</p>
            </article>
            <article>
                <header>
                    <aside>August 2020 - January 2022</aside>
                    <aside>Madrid</aside>
                    <a
                        href="https://www.aws.amazon.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        AWS
                    </a>
                </header>
                <p>Sr. Frontend Engineer (L5)</p>
            </article>
            <article>
                <header>
                    <aside>August 2017 - July 2020</aside>
                    <aside>Madrid</aside>
                    <a
                        href="https://www.bbvanexttechnologies.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        BBVA Next
                    </a>
                </header>
                <p>Sr. Frontend Engineer</p>
            </article>
            <article>
                <header>
                    <aside>April 2014 - July 2017</aside>
                    <aside>Madrid</aside>
                    <a
                        href="https://www.indracompany.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Indra
                    </a>
                </header>
                <p>Frontend Engineer</p>
            </article>
        </main>
    </section>
);
const education = (
    <section className="block education" id="education">
        <a href="#education">
            <h2 className="section-title">Education</h2>
        </a>
        <main>
            <article>
                <header>Universidad de Cantabria (2008-2013)</header>
                <strong>BSc+MSc in Computer Science</strong>
            </article>
            <article>
                <header>Jönköping Technical University (2011-2012)</header>
                <strong>BSc+MSc Courses</strong>
            </article>
            <article className="languages">
                <header>Languages</header>
                <strong>Spanish: Native</strong>
                <strong>English: Professional proficiency (CAE)</strong>
                <strong>French: Basic</strong>
            </article>
        </main>
    </section>
);
const IndexPage = () => {
    return (
        <SiteLayout className="portfolio">
            {summary}
            {professionalExperience}
            {education}
        </SiteLayout>
    );
};

export default IndexPage;
