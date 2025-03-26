import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import HomepageUsages from '../components/HomepageUsages';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            // to="https://meta3d-local-9gacdhjl439cff76-1302358347.tcloudbaseapp.com/gts_play_production/dist/index.html">
            to="https://www.gts-play.cn/">
            Enter Game
          </Link>
        </div>
        <div className={styles.buttons}>
          <Link
            style={{
              "marginTop": "2rem"
            }}
            className="button button--secondary button--lg"
            to="https://discord.gg/XNxerMsX">
            Enter Forum
          </Link>
        </div>
        <div className={styles.buttons}>
          <Link
            style={{
              "marginTop": "2rem"
            }}
            className="button button--secondary button--lg"
            to="https://discord.gg/XNxerMsX">
            Discord
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        {/* <HomepageFeatures />
        <HomepageUsages /> */}
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
