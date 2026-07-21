# Twilio SMS Advanced Controls Enhancement
## Customer-Driven Fraud Prevention for SMS Pumping Protection

**Document Type:** Product Enhancement Proposal  
**Prepared For:** Twilio Product & Engineering Leadership  
**Date:** May 15, 2026  
**Version:** 2.0 - Executive Summary (6-Page)

---

## Executive Summary

### The Problem: Speed Mismatch in the Agentic Era

**1. Fraudsters Evolve Faster Than ML Models**

In the Agentic Era, AI-powered fraud attacks emerge and mutate in days, not months. Our current approach—identify pattern, analyze traffic, build model, deploy—leaves customers bleeding money for 2-4 weeks while waiting for Twilio's remediation.

- New fraud vectors appear within 48 hours, exploiting emerging network vulnerabilities
- Traditional ML model development takes 2-4 weeks minimum from detection to deployment
- Customers lose $50K-$500K during this gap with only one option: disable entire countries, destroying legitimate business

**Example:** A fintech customer faced SMS pumping from a specific carrier in Indonesia. They identified the MCC-MNC code (510-11) as 100% fraudulent traffic but had no way to block it. Solution today: Block all of Indonesia → lost 40% of legitimate 2FA volume, $200K monthly revenue impact.

**2. Customers Know Their Traffic Better Than We Do**

Customers see fraud signals in *their* systems that they cannot share with us due to PII restrictions, competitive sensitivity, or internal business logic:

- Their own ML models flag suspicious patterns based on user behavior we can't access
- They have internal spending limits and risk tolerance thresholds tied to business logic
- They need immediate action: "Alert me when Nigeria spend hits $500/hour and auto-block"
- Current limitation: No self-service controls to act on their intelligence

**Example:** An e-commerce platform's fraud team identified 500 phone numbers involved in account takeover attacks. Their only option: File support tickets → 24-48hr response time → fraud continues for 2 more days.

**3. Competitive Pressure: We're Losing Deals**

**Vonage**, **Bandwidth**, and **Infobip** all ship fraud alerting with customer-defined spend/volume thresholds and linked auto-actions.

**Q1 2026 Loss Analysis:**
- 12 lost opportunities: $2.4M ARR
- Primary objection (10/12 deals): "No spend alerts with auto-block capability"
- Customer quote: *"We chose Vonage because we can set a $5K daily alert and auto-block the geography. Twilio makes us watch the dashboard 24/7."*

**4. Strategic Alignment: Shared Responsibility Model**

This proposal aligns with Twilio's evolving fraud prevention strategy: **moving from purely reactive (Twilio blocks everything) to proactive shared responsibility** where customers and Twilio collaborate.

**Why Shared Responsibility Works Better:**
- Fraud is contextual: What's fraud for one business is legitimate for another
- Customers have signals we'll never see (user behavior, payment patterns, business logic)
- Speed matters: Customer-defined rules execute in seconds vs. weeks for ML model updates
- Trust & transparency: Customers want visibility and control, not a black box

This proposal gives customers the controls to act proactively on their intelligence while Twilio's AIT provides the foundational protection layer. **Together, we stop fraud faster and more accurately than either party could alone.**

---

## Proposed Solution: SMS Advanced Controls

Extend our **Advanced Protection** tier (already priced at +$0.025 per international message) with customer-controlled fraud prevention features that complement our AIT intelligence.

### Core Enhancement: Five New Control Capabilities

#### **1. Default Protection Levels** 
Customer-selectable baseline SMS pumping protection sensitivity (Low/Medium/High) that adjusts AIT thresholds globally.

#### **2. Country-Specific Protection Levels**
Override default protection level per country (e.g., High for India, Medium for US).

#### **3. DIY Fraud Prevention Rules** 
Customer-configured alerts with automatic actions:
- **Volume/Spend Thresholds:** "Alert when Thailand SMS >1000 msgs/hour → Block traffic"
- **Intelligent Thresholds:** Leverage AIT scores: "Alert when risk score >0.8 → Increase protection"
- **Geographic Scoping:** Global, regional (NAMER/EMEA/LATAM/APAC), or country-specific rules
- **Action Triggers:** None, Increase protection, or Block traffic

#### **4. Block List Management**
Immediate blocking of identified fraud sources:
- **Network Blocking:** Block by carrier (MCC-MNC) or carrier name
- **Phone Number Blocking:** Block individual numbers or prefixes (+1234567xxx)
- **Channel-Specific:** Apply blocks to SMS, WhatsApp, RCS, or MMS independently
- **TTL Support:** Temporary blocks (hours/days) or permanent

#### **5. Safe List Management**
Protect VIP/corporate numbers from false positives:
- **Full Number Matching:** Exact phone number safelist
- **Prefix Matching:** Safelist entire ranges (+1415555xxxx)
- **Bulk CSV Upload:** Safelist 1000s of corporate numbers in one operation

**Business Value:** Empowers customers to respond in minutes instead of hours/days. Closes competitive gap with Vonage/Bandwidth. Enables shared responsibility fraud prevention model.

---

## Why We Can Build This Fast

### 80% of Infrastructure Already Exists

| Component | Existing Asset | How We Leverage | New Build Required |
|-----------|---------------|-----------------|-------------------|
| **Alert Rules** | Intelligent Alerts engine (Monitor) | Extend with volume/spend thresholds | Add: Spend calculation engine, action executor (20% new) |
| **Fraud Signals** | AIT SMS Pumping detection | Surface risk scores in rules | Add: Customer threshold configuration (10% new) |
| **Geo Blocking** | Geo Permissions API (2+ years production) | Add UI controls, TTL, action triggers | Add: Console UI, auto-expire logic (30% new) |
| **Carrier Blocking** | Backend carrier routing/limits | Expose as customer control | Add: MCC-MNC blocklist, Console UI (40% new) |
| **Safe List** | Global Safe List API | Add Console UI, bulk operations | Add: CSV upload, Console wrapper (25% new) |
| **Default Protection Levels** | AIT threshold tuning (Low/Med/High) | Already configurable internally | Add: Customer-facing UI only (10% new) |

**Engineering Estimate:** 12 FTE-months  
**Time to Beta:** 3 months from kickoff

---

## Detailed Feature Specifications

### Feature 1: DIY Fraud Prevention Rules

**What It Is:** Customer-configured rules that trigger alerts and automatic actions when thresholds are breached.

**Rule Configuration:**

Each rule specifies:
- **Channel:** SMS, RCS, WhatsApp, MMS
- **Direction:** Inbound, Outbound, Both
- **Alert Type:** 
  - Volume(#) Alert: Numeric message count threshold
  - Usage($) Alert: Spend threshold in dollars
  - Fraud Alert: Intelligent (AIT risk score based)
- **Threshold:** 
  - Numeric (e.g., 1000 messages, $500 spend)
  - Intelligent (AIT determines dynamically)
- **Frequency:** Hourly, Daily, Weekly, Monthly
- **Scope:** Global, NAMER, EMEA, LATAM, APAC, or specific country
- **Notification:** Email, Webhook, or None
- **Action:** None (alert only), Increase protection, Block traffic

**Example Rules:**

```
Rule 1: SMS Burst Protection - Nigeria
- Channel: SMS (Outbound)
- Alert Type: Volume(#) Alert
- Threshold: 1000 messages
- Frequency: Hourly
- Scope: Nigeria
- Notification: security@company.com
- Action: Block Traffic (auto-blocks Nigeria for 4 hours)
```

```
Rule 2: Spend Cap - Brazil
- Channel: SMS (Outbound)
- Alert Type: Usage($) Alert
- Threshold: $500
- Frequency: Hourly
- Scope: Brazil
- Notification: https://webhook.site/alert
- Action: Increase protection (switches Brazil to High mode)
```

```
Rule 3: Intelligent Fraud Detection - APAC
- Channel: WhatsApp (Both)
- Alert Type: Fraud Alert
- Threshold: Intelligent (AIT determines)
- Frequency: Daily
- Scope: APAC
- Notification: alerts@company.com
- Action: None (alert only for review)
```

**Rules Table View:**

| Channel | Alert Type | Threshold | Frequency | Scope | Notification | Action |
|---------|-----------|-----------|-----------|-------|--------------|--------|
| SMS (Outbound) | Volume(#) Alert | 1000 | Hourly | Global | saydas@twilio.com | Block Traffic |
| WhatsApp (Both) | Fraud Alert | Intelligent | Daily | EMEA | webhook | Increase protection |
| RCS (Inbound) | Usage($) Alert | 5000 | Weekly | NAMER | None | None |

**Alerts View:**

Historical view of triggered alerts with filters:
- Channel, date range, volume threshold, scope
- Alert type, action taken, notification sent

**Alert History Table:**

| Channel | Scope | Volume | Date and Time | Action | Notification | Alert Type |
|---------|-------|--------|---------------|--------|--------------|-----------|
| SMS (Outbound) | 🇹🇭 Thailand (+66) | 2515 | 2025.03.27 20:55:43 | None | Yes | Volume(#) Alert |
| SMS (Outbound) | 🇩🇪 Germany (+49) | 32566 | 2025.03.11 17:56:10 | Block Traffic | Yes | Volume(#) Alert |
| WhatsApp (Both) | 🇳🇿 New Zealand (+64) | 1937 | 2025.02.11 04:52:54 | Block Traffic | Yes | Fraud Alert |

**UI Location:** SMS Pumping Protection → Advanced → DIY Fraud Prevention section

**Technical Implementation:**

**New Components:**
1. **Real-time Spend Aggregation Engine:**
   - Calculate spend windows (hourly/daily/weekly/monthly) in Redis
   - Trigger when threshold breached
   - 5-minute granularity (not real-time to second)

2. **Action Executor Service:**
   - Receives trigger from Intelligent Alerts or Spend Engine
   - Executes action: Call Geo Permissions API to block, or adjust AIT threshold
   - Records action in audit log

3. **Rule Configuration API:**
   - CRUD endpoints for fraud rules
   - Stored in PostgreSQL
   - Validation to prevent conflicting rules

**Leverages Existing:**
- ✅ Intelligent Alerts rule engine (extend with new metric types)
- ✅ Notification infrastructure (email/webhook)
- ✅ AIT risk scores (calculated per message)
- ✅ Geo Permissions API (dynamic enable/disable)

**Engineering:** 8 weeks (3 engineers)

---

### Feature 2: Block List Management

**What It Is:** Customer-maintained lists of networks or phone numbers to block immediately.

**Two Block Types:**

#### **Network Blocks**
Block entire carriers using MCC-MNC codes:

**Configuration:**
- **Country + Network:** Select Germany → Vodafone (auto-fills MCC-MNC 262-02)
- **Or Direct MCC-MNC:** Enter 262-02 manually
- **Channel:** SMS, RCS, WhatsApp, MMS
- **Direction:** Inbound, Outbound, Both
- **TTL:** X days or Permanent
- **Reason:** Free text (audit trail)

**Example:** Block "Vodafone Germany (262-02)" for SMS Outbound, 30 days, reason: "High fraud rate detected by internal ML model"

**Network Block Table View:**

| Country | Network | MCC-MNC | Channel | TTL | Reason | Created | Status |
|---------|---------|---------|---------|-----|--------|---------|--------|
| Germany | Vodafone | 262-02 | SMS (Outbound) | Permanent | High fraud rate detected | 2025.03.15 14:22:10 | Active |
| India | Jio | 405-857 | WhatsApp (Both) | 30 days (Expires: 2025.04.20) | Temporary block for investigation | 2025.03.21 09:15:33 | Active |

#### **Phone Number Blocks**
Block individual numbers or prefixes:

**Configuration:**
- **Phone Number:** Full (+919611531234) or Prefix (+919611531xxx)
- **Channel:** SMS, RCS, WhatsApp, MMS
- **Direction:** Inbound, Outbound, Both
- **TTL:** X days or Permanent
- **Reason:** Free text

**Phone Number Block Table View:**

| Phone Number | Channel | TTL | Reason | Created | Status |
|--------------|---------|-----|--------|---------|--------|
| +919611531xxx | SMS (Inbound) | 7 days (Expires: 2025.04.05) | Spam number prefix | 2025.03.29 16:45:21 | Active |

**Bulk Upload:**
- CSV format: `phone_number,channel,direction,ttl_days,reason`
- Up to 10,000 numbers per upload
- Preview before commit (shows validation errors)
- CSV template download available

**Add Block Form:**

Network block form includes:
- Country dropdown (filters network list)
- Network dropdown (auto-fills MCC-MNC when selected)
- Or manual MCC-MNC entry (format: 262-02)
- Channel selection (SMS/RCS/WhatsApp/MMS)
- Direction (Inbound/Outbound/Both)
- TTL: numeric input + dropdown (Days or Permanent)
- Reason text field

Phone number block form includes:
- Phone number input (E.164 format validation)
- Auto-converts to prefix format if full number entered (+919611531234 → +919611531xxx)
- Channel, Direction, TTL, Reason fields

**Auto-Expiration:**
- Background job checks TTL daily
- Expired blocks automatically archived (not deleted for audit)
- Customers can view archived blocks and re-enable if needed

**UI Location:** SMS Pumping Protection → Advanced → Block List section

**Technical Implementation:**

**New Components:**
1. **Block List Storage:**
   - PostgreSQL tables: `network_blocks`, `phone_number_blocks`
   - Indexes on: MCC-MNC, phone_prefix, channel, expiration_date
   - High-performance lookup required (sub-10ms query time)

2. **Block Enforcement Layer:**
   - Intercepts message routing decisions
   - Checks: Is destination network blocked? Is phone number blocked?
   - Returns block verdict to messaging pipeline
   - Must scale to 10K+ queries/second

3. **Bulk Upload Processor:**
   - CSV parser with E.164 validation
   - Batch insert (1000 rows at a time)
   - Line-level error reporting for validation failures

**Leverages Existing:**
- ✅ Carrier routing data (MCC-MNC mapping maintained)
- ✅ Geo Permissions block logic (similar enforcement pattern)

**Engineering:** 6 weeks (2 engineers)

---

### Feature 3: Safe List Management

**What It Is:** Safelist phone numbers to exclude from all fraud detection, preventing false positives for VIP/corporate numbers.

**Configuration:**

- **Phone Number:** Full (+12025551234) or Prefix (+1202555xxxx)
- **Type:** Auto-detected (full vs prefix)
- **Reason:** Free text (e.g., "Corporate headquarters main line")

**Safe List Table View:**

| Phone Number | Type | Reason | Added By | Created |
|--------------|------|--------|----------|---------|
| +12025551234 | Full | Corporate headquarters main line | admin@company.com | 2026.05.08 10:30:15 |
| +919611531xxx | Prefix | Trusted partner number range | security@company.com | 2026.05.09 14:22:30 |
| +442071234567 | Full | UK customer service line | admin@company.com | 2026.05.10 09:15:42 |

**Add to Safelist Form:**

- **Phone Number:** E.164 format validation (e.g., +12025551234 or +1202555xxxx)
- **Type Selection:** Radio buttons for Full number (exact match) or Prefix (range match)
- **Reason:** Optional text field to document why number is trusted
- Auto-validation: Shows format guidance and examples

**Bulk Upload:**
- CSV format: `phone_number,reason`
- Preview first 10 entries before upload
- Validation: E.164 format check, prefix format check (xxx wildcard)
- Error reporting for invalid formats
- Max file size: 5MB
- Max entries: 5,000 per upload
- CSV template download with examples

**Bulk Upload Preview Table:**

Shows first 10 entries with:
- Phone Number (monospace font)
- Type (Full/Prefix badge)
- Reason
- Validation status (✓ or error message)

**Bulk Upload Validation:**

Example errors displayed:
- Line 5: +1234567 - Invalid E.164 format (too short)
- Line 12: +91961153 - Invalid E.164 format (missing digits)
- Line 23: Exceeded 5,000 entry limit

**CSV Template Format:**
```
phone_number,reason
+12025551234,Corporate main line
+919611531xxx,Partner number range
```

**UI Location:** SMS Pumping Protection → Advanced → Safe List section

**Technical Implementation:**

**Leverages Existing:**
- ✅ Global Safe List API (production for 2+ years, proven at scale)
- ✅ Enforcement logic already bypasses fraud checks for safelist entries
- ✅ E.164 validation library

**New Components:**
- Console UI wrapping existing API
- CSV upload/download handlers
- Prefix wildcard support (xxx notation)
- Preview validation before bulk commit
- Audit log display (who added, when)

**Engineering:** 4 weeks (1 engineer)

---

## Business Case

### Investment Required

**Engineering:** 12.25 FTE-months ≈ $450K
**Product & Design:** $120K  
**Infrastructure:** $5K  
**Total:** $575K

### Revenue Impact Summary

| Impact Area | Conservative Estimate |
|-------------|----------------------|
| **Retained Revenue (Churn Prevention)** | $10.6M ARR |
| **New Revenue (Win Rate Improvement)** | $2.4M ARR (24 months) |
| **New Revenue (Advanced Adoption Growth)** | $45M ARR |
| **Total Benefit** | $58M ARR |
| **ROI** | 9,878% over 24 months |

---

## Success Metrics (12 Months)

- **DIY Rules:** 40% of Advanced Protection customers create ≥1 rule
- **Block List:** 30% of customers use network or phone blocking
- **Safe List:** 50% of customers safelist ≥1 number (up from 20% API-only)
- **Advanced Protection Adoption:** Increases from 15% to 25%
- **Churn Rate:** Fraud-related churn drops from 8% to 3%
- **Win Rate:** Deals with fraud objection improve from 35% to 50%

---

## Next Steps

**Approve for immediate development** with 3-month timeline to beta launch.

**Timeline:**
- **Month 1:** Foundation + Default/Country Protection UI (quick win)
- **Month 2:** DIY Rules backend + Block List + Safe List UI
- **Month 3:** DIY Rules frontend + Integration testing + Private beta
- **Month 4:** GA launch with marketing campaign

---

**END OF PROPOSAL**
