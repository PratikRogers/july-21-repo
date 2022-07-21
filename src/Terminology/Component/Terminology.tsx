/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';
import "../../CSS/redui.css";
import "../../CSS/Planning.css";
import "../Terminology.css";
import { getTermTopPos } from '../utils/terminologyutils';
// import { Row, Col } from 'react-bootstrap';


class Terminology extends React.Component<ITerminology, {}> {

    private refArr:any;
    constructor(props: any) {
        super(props);
        this.refArr = [];
        this.focusText = this.focusText.bind(this);
        this.slickToItem = this.slickToItem.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        
    }

    public slickToItem(index:any,e:any) {
        const component = this.refArr[index];
        let topPos = getTermTopPos(index);
        component.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
        const rect = component.getBoundingClientRect();
        
        window.scrollTo(rect.left, rect.top + topPos);
     }

    public focusText(ref: any, grpButton?:any) {
        this.refArr.push(ref);
    }

    public render() {
        return (
            <main role="main" className="container-fluid ">
            
            <div className='col-12 planningContent regFont'>
                <h1 className="reduiRedColor termFntSize"  >R.E.D. Terminology and Methodology</h1>
                 <ul>
                    <li><a className="reduiRedColor pointerHand" onClick={this.slickToItem.bind(this,0)}>Audience Sizing Methodology</a></li>
                    <li><a className="reduiRedColor pointerHand" onClick={this.slickToItem.bind(this,1)}>What is R.E.D.?</a></li>
                    <li><a className="reduiRedColor pointerHand" onClick={this.slickToItem.bind(this,2)}>Frequently Asked Questions (FAQs)</a></li>
                    <li><a className="reduiRedColor pointerHand" onClick={this.slickToItem.bind(this,3)}>Common Terms and Definitions</a>
                        <ul>
                            <li><a  className="reduiRedColor pointerHand" ref={this.focusText} onClick={this.slickToItem.bind(this,4)}>Data</a></li>
                            <li><a   className="reduiRedColor pointerHand" onClick={this.slickToItem.bind(this,5)}>Measurement and Reporting</a></li>
                            <li><a  className="reduiRedColor pointerHand" onClick={this.slickToItem.bind(this,6)}>R.E.D. Products and targeting tactics</a></li>
                            <li><a  className="reduiRedColor pointerHand" onClick={this.slickToItem.bind(this,7)}>Video and Television</a></li>
                        </ul>
                    </li>
                </ul>
                <h2 className="reduiRedColor termFntSize" >Audience Sizing Methodology</h2>
                <ul>
                    <li>Counts are estimates only and are subject to daily fluctuations based on actual usage.</li>
                    <li>Number of Canadians is derived from a data model combining Wireless and Cable billing records with digital cookie data and set-top box activity within the Rogers Cable footprint.</li>
                    <li ref={this.focusText}>TV Inventory is based on the average ad exposure in a 28 day period by the average viewer across all Rogers channels.</li>
                    <li>Digital Inventory is based on the average ad load and average page views per visitor in a 28 day period across all Rogers owned properties.</li>
                    <li >This does not include exchange-based traffic.</li>
                </ul>
                
                <h2 className="reduiRedColor termFntSize" >What is R.E.D.?</h2>
                <p>R.E.D. (Rogers Enabled Data) Solutions is a suite of products that targets real Canadians through aggregated and anonymous audience segments leveraging Rogers’ first party demographic, behavioral and location-based data. R.E.D. Solutions is powered by R.E.D. Platform, Rogers’ integrated tech stack.</p>
                <p>R.E.D. Platform enables advanced multi-device audience targeting across Rogers’ premium-owned and partner properties with extended reach through hand-selected, brand-safe, quality inventory.</p>
                <h3 className="reduiRedColor termFntSize">Product Benefits</h3>
                <p><i className="subHeading">Real Canadian audiences:</i> Anonymous and aggregated proprietary Rogers’ first party data based on verified demographics, user behaviours and location data giving a holistic view of the audiences.</p>
                <p><i className="subHeading">Audience segments:</i> Built from our data, which feeds into Rogers’ standard, premium and custom segments that match advertisers’ exact needs, using Rogers’, advertiser CRM and third party data.</p>
                <p><i className="subHeading">Advanced targeting capabilities:</i> Predictive targeting across devices, locations, live events, search queries, media behaviour and synced media platforms, enabling brands to reach their specific target anytime, anywhere.</p>
                <p><i className="subHeading">Premium inventory:</i> World-class content across brand safe, highly viewable websites and fraud-free inventory on Rogers’ media properties and ad network.</p>
                <p><i className="subHeading" >Scale and reach:</i> 30M+ Canadians reached monthly (96% of 12+ Canadian population), through multiple screens, devices, online and offline, and ad formats across premium sites. Achieve brand reach goals by overlaying anonymous and aggregated Rogers and partner data on brand programmatic buys or through Rogers high-quality open exchange targeting. (Source: 12+ Unduplicated Reach, MediaMix (ComScore, Numeris, Vividata), Rogers Total Unduplicated Reach across TV, Digital, Print, Radio, 2017 Data).</p>
                <p><i className="subHeading" ref={this.focusText}>Insights and Attribution:</i> Uses campaign, media, location and purchase behavior as well as brand effectiveness data to help inform business and marketing decisions for the advertiser.</p>
                <p><i className="subHeading">Privacy:</i> At Rogers, we are committed to protecting the privacy of our customers’ personal information. We take all reasonable steps to ensure that this information is safe and secure, including putting in place rigorous policies and procedures to fully comply with all Canadian privacy laws and regulations.</p>

                <h2 className="reduiRedColor termFntSize">Frequently Asked Questions (FAQs)</h2>
                <p><i className="subHeading">How is this different from other solutions on the market?</i></p><p>Our data and audience segments are made up of unique, verified data on real Canadians and is exclusive to Rogers.</p>
                <p><i className="subHeading">How is this different from what Rogers has been offering before?</i></p>
                <p>This is part of our big data evolution - Rogers is making available anonymous and aggregated proprietary Rogers’ first party data from across the different sources (Wireless, Cable, Internet, TV and Media) based on verified demographics, user behaviours and location data giving a holistic view of our audiences. As part of the R.E.D. offering we’ve added more data sources and more ways of transacting against it including 6 new and unique products at launch and more to come in the next 18 months.</p>
                <p><i className="subHeading">How can advertisers and agencies buy Rogers audience segments?</i></p>
                <p>Rogers’ audience segments will be made available to run on Rogers Media properties and partner sites to advertisers and agencies through direct and programmatic channels.</p>
                <p><i className="subHeading">Can agencies or advertisers buy just the data?</i></p>
                <p>Rogers’ audience segments will be made available to select partners.</p>
                <p><i className="subHeading"  ref={this.focusText}>How are we ensuring customers’ privacy? Is this adhering to current privacy legislation?</i></p>
                <p>At Rogers, we are committed to protecting the privacy of our customers’ personal information. We take all reasonable steps to ensure that this information is safe and secure, including putting in place rigorous policies and procedures to fully comply with all Canadian privacy laws and regulations.</p>

                <h2 className="reduiRedColor termFntSize" ref={this.focusText}>Common Terms and Definitions</h2>
                <h3 className="reduiRedColor termFntSize"  >DATA</h3>
                <p><i className="subHeading">Deterministic –</i> Deterministic data refers to data that is known to be true. For example, when a customer makes an online purchase and inputs information such as name, address, postal code, phone number, etc., that’s deterministic data.</p>
                <p><i className="subHeading">Probabilistic –</i> Probabilistic data, also known as inferred or modeled data, makes assumptions about users based on online activities and behaviour, meaning they are probable matches. We can assign individuals to specific categories depending on what they search, read, watch or bought.</p>
                <p><i className="subHeading">Aggregate and Anonymous –</i> A set of data is considered “anonymized” when it is stripped of “personally identifiable/identifying information,” or “PII.” Aggregate data is composed from a multitude or combination of other more individual data. First Party Data - First-party data is data which you have collected about your customers yourself, and it is usually the most desirable type.</p>
                <p><i className="subHeading">Second Party Data -</i> Second-party data is basically first-party data that you are getting directly from another source. Third Party Data - Third-party data is purchased on a massive scale from data management platforms (DMPs) and then sold to marketers and businesses. BlueKai and Nielsen are just a few of the most prolific companies that collect, store, sort, and sell third-party data, also known as data aggregators.</p>
                <p><i className="subHeading">Audience Segment –</i> A group of aggregated and anonymized users based upon defined criterion such as product usage, demographics, psychographics, communication behaviors and media use.</p>
                <p><i className="subHeading">R.E.D. Audience Segment – Standard –</i> Readily available segments based on Rogers verified demographic data including age, gender, language, handset type, postal code. Also includes pre-crafted segments based on lifestyle/behaviour interests; Canadian Moms, Canadian NHL Fans, Canadian Small Business Owners, etc. Standard segments include look-alike modelling.</p>
                <p><i className="subHeading">R.E.D. Audience Segment – Premium –</i> The ability to assemble or augment audience segments from a list of pre-set attributes, anchored in online browsing and consumption behavior. Can include up to two (2) demographic attributes, up to two (2) interested based attributes, and/or up to two (2) behavioural attributes. For example, Female Hockey Fan is a premium segment that layers, two demographic attributes (female + age 25-54), one interest attribute (Sports – hockey) and two behavioural attributes (watches hockey on TV, reads hockey content online). Premium segments include look-alike modelling. Minimum media spend required.</p>
                <p><i className="subHeading">R.E.D. Audience Segment – Custom –</i> The ability to create custom audience segments with Rogers’ data (based on greater customization than premium, i.e. more than 2 attributes per data trait) by matching Rogers’s data to advertiser’s data (CRM or data match) or to matching Rogers’ data with a third party’s data (CRM or other data match). Custom segments include look-alike modelling. Minimum media spend required.</p>
                <p><i className="subHeading">Look-alike Model -</i> Look-alike models are used to build larger audiences from smaller segments to create reach for advertisers. The larger audience reflects the benchmark characteristics of the original audience.</p>
                <p><i className="subHeading">CRM Data –</i> CRM stands for Customer Relationship Management and is a term that refers to practices, strategies and technologies that companies use to manage and analyze customer interactions and data. CRM data may include but is not limited to phone numbers or email addresses. This information is anonymized through a process called hashing which turns the phone number or email into a non-traceable numeric code.</p>
                <p><i className="subHeading">Hashing –</i> PII data cannot be shared between two companies – if an advertiser is sending us data, it must be hashed with protocol SHA256.</p>
                <p><i className="subHeading">ID Graph or Identity -</i> An identity graph, or ID graph, is a database that houses all the known identifiers that correlate with individual customers.</p>
                <p><i className="subHeading">Personally Identifiable Information (PII) -</i> Any representation of information that permits the identity of an individual to whom the information applies to be reasonably inferred by either direct or indirect means.</p>
                <p><i className="subHeading"  ref={this.focusText}>Personally Identifiable Information Protection and Electronic Documents Act (PIPEDA) -</i> The Personal Information Protection and Electronic Documents Act is a Canadian law that relates to data privacy. PIPEDA stipulates that Personally Identifiable Information (or PII) must be: collected with consent and for a reasonable purpose.</p>
                <p><i className="subHeading">GDPR -</i> The General Data Protection Regulation (GDPR) is a legal framework that sets guidelines for the collection and processing of personal information of individuals within the European Union (EU). GDPR affects all Global publishers, if their sites and content is accessible by users in the EU.</p>

                <h3 className="reduiRedColor termFntSize">MEASUREMENT AND REPORTING</h3>
                <p><i className="subHeading">On-Target Impressions –</i> A measure of total ad impressions that are delivered to a strategic target audience.</p>
                <p><i className="subHeading">Cost per Targeted Impression (CPTI) –</i> Metric for assessing adverting expenditure determined by dividing the total cost for a certain advertisement by the percentage of an audience who experienced that advertisement (e.g. Seen, heard) are actually within the marketer’s target market.</p>
                <p><i className="subHeading">Viewability -</i> An online advertising metric that aims to track only impressions that can actually be seen by users. For example, if an ad is loaded at the bottom of a webpage but a user doesn’t scroll down far enough to see it, that impression would not be deemed viewable.</p>
                <p><i className="subHeading">Ad Engagement -</i> Ad engagement is often measured by observing and numbering the different consumer interactions for a given ad. Ad engagement metrics can include, click through, click to expand, click to play, mouse over, etc.</p>
                <p><i className="subHeading">Click through rate (CTR) –</i> Measures the ratio of clicks to impressions of an online ad.</p>
                <p><i className="subHeading">Cost Per Click (CPC) –</i> A pricing and reporting model in which advertisers only pay once a display or video ad has been clicked.</p>
                <p><i className="subHeading">Cost per Acquisition (CPA) -</i> An online advertising pricing model where the advertiser pays for a specified acquisition - for example a sale, click, or form submit (e.g., contact request, newsletter sign up, registration etc.).</p>
                <p><i className="subHeading">Cost Per Listen (CPL) –</i> A pricing and reporting model in which advertisers only pay once an audio ad has been heard.</p>
                <p><i className="subHeading">Listen Through Rate (LTR) –</i> Measures the number of audio ads heard divided by the number of impressions delivered.</p>
                <p><i className="subHeading">Video Completion Rate (VCR) -</i> The percentage of all video ads that play through their entire duration to completion.</p>
                <p><i className="subHeading"  ref={this.focusText}>Attribution -</i> The process of identifying a set of user actions that contribute in some manner to a desired outcome, and then assigning a value to each of these events.</p>
                <p><i className="subHeading">Nielsen Digital Campaign Rating (DAR) –</i> A campaign reporting tool that allows advertisers to see a daily delivery of ad impressions served against a specific age and gender as based on Facebook user data.</p>
                
                <h3 className="reduiRedColor termFntSize" >R.E.D. PRODUCTS AND TARGETING TACTICS</h3>
                <p><i className="subHeading">Managed Service –</i> As it relates to R.E.D. Solutions, Managed Service is when Rogers is the media buyer or executer of a campaign. Managed Service campaigns typically require a contract or IO to be created and signed by the agency or advertiser. An example of a managed service product that Rogers offers would be GeoTxt or R.E.D. TV.</p>
                <p><i className="subHeading">Self Service –</i> As it relates to R.E.D. Solutions, Self Service or Self-Serve is when an advertiser or agency is the media buyer of a campaign, typically through programmatic channels via their own Demand Side Platform (DSP).</p>
                <p><i className="subHeading">R.E.D. on Rogers –</i> Reach Rogers Audiences on Rogers Owned &amp; Operated and Exclusive Partner Network Inventory. Available through Managed Service or Self Service.</p>
                <p><i className="subHeading">R.E.D. X –</i> Reach Rogers Audiences across a hand selected, white-list of brand safe sites across the top ad exchanges. Ability use unique targeting tactics such as key word searches, contextual key word, location or geo-fences, event and conversion zones and through dynamic creative. Available through Managed Service only.</p>
                <p><i className="subHeading">R.E.D. Sync –</i> Reach Rogers TV audiences through second screen devices in near real time based on their most recent viewership habits. Ability to target specific TV audiences through unique executions such as Ad Sync, Game Time Sync, Award Show Sync or Prime Time Sync. Available through Managed Service or Self Service.</p>
                <p><i className="subHeading">R.E.D. TV –</i> Use Rogers Audiences to inform a custom Linear TV or VOD buy on the Rogers Broadcast Network. Available through Managed Service only.</p>
                <p><i className="subHeading">R.E.D. GeoTxt –</i> Reach Rogers mobile customers through one-to-one SMS/MMS text messages delivery. Ability to deploy messages based on geo-fence trigger zones. Available through Managed Service only.</p>
                <p><i className="subHeading">R.E.D. Audio –</i> Reach Rogers Audiences when they are live streaming Rogers Radio and Pod Cast digital feeds in real time. Available through Managed Service or Self Service.</p>
                <p><i className="subHeading">R.E.D. Box –</i> Exclusive to R.E.D. Partners, R.E.D. Box allows secured and privacy compliant use of Rogers’ Audience segments through an agency’s or advertiser’s Demand Side Platform on and off Rogers’ inventory.</p>
                <p><i className="subHeading">Key Word Search –</i> A targeting tactic available in R.E.D. X that allows advertisers to target specific audiences based on words they are searching for. Example, if an advertiser is looking to target an expectant mom, they may want to include key words such as, diapers, nursing, breast feeding, delivery, etc.</p>
                <p><i className="subHeading">Key Word Contextual –</i> A targeting tactic available in R.E.D. X that allows advertisers to target specific audiences based on words on web pages they are currently reading. For example, if an advertisers is looking to target someone in market for a new luxury SUV, they may want to include key words such as, Audi, BMW, Lexus, SUV, Crossover, etc.</p>
                <p><i className="subHeading">Dynamic Creative (Automotive VIN) –</i> A unique Automotive creative solution available in R.E.D. X that allows advertisers to build and serve creative in real time to specific audiences using Vehicle Identification Number feeds.</p>
                <p><i className="subHeading">Conversion Zone –</i> A reporting tactic available in R.E.D X that allows advertisers to track mobile audiences who enter into a POI (Point of Interest) such as a store or restaurant.</p>
                <p><i className="subHeading">Event Zone –</i> A targeting tactic available in R.E.D. X that allows advertisers to target specific audiences based on their location at a specific event. It also allows advertisers to target audiences who were at a specific event after the fact. For example, people at the Rogers Centre during or after they attend Blue Jays games.</p>
                <p><i className="subHeading">Geo-fence -</i> A virtual geographic boundary, that enables software to trigger a response when a mobile device enters or leaves a particular area.</p>
                <p><i className="subHeading">Mobile Device ID -</i> Mobile Device Identifiers, or Mobile Device IDs are a unique identifier which can be used to identify a mobile device. They can usually only be accessed via a mobile app.</p>
                <p><i className="subHeading">White List –</i> A whitelist includes a list of acceptable web sites/domains on which to run inventory (all others prohibited).</p>
                
                <h3 className="reduiRedColor termFntSize" ref={this.focusText}>VIDEO AND TELEVISION</h3>
                <p><i className="subHeading">Linear TV –</i> Live television that is watched as scheduled.</p><p><i className="subHeading">VOD –</i> Video on Demand, example, Rogers on Demand.</p><p><i className="subHeading">OLV –</i> Online Video, example, CityTV.com.</p><p><i className="subHeading">FEP –</i> Full Episode Player, example, Modern Family on CityTV.com.</p><p><i className="subHeading">OTT –</i> Over the Top TV services, example, Sportsnet Now or Netflix.</p><p><i className="subHeading">Connected TV –</i> Connected TV, sometimes referred to as Smart TV, is a television set with integrated Internet and interactive “Web 2.0” features.</p><p><i className="subHeading">Set Top Box -</i> a box-shaped device that converts a digital television signal to analogue for viewing on a conventional set, or that enables cable or satellite television to be viewed. Example, Rogers NEXTBOX.</p><div className="spacer20"/> 

            </div>
            </main>
        )

    }
}

function mapStateToProps(state: any) {
    return {

    };
}

export default connect(mapStateToProps, (dispatch) => {
    return {


    }

})(Terminology);

interface ITerminology extends React.FC<any> {
    handleSubmit: any;
}
