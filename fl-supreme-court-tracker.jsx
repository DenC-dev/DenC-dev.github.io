import React, { useState, useMemo, useEffect } from "react";

// Docket data: every opinion and order issued by the Supreme Court of
// Florida in 2026, through July 24. Source: Florida Supreme Court case
// records via law.justia.com/cases/florida/supreme-court/2026/.
const CASES = [
  { docket: "SC2026-1083 · SC2026-1084", title: "Duckett v. State of Florida", date: "2026-07-24", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2026-1083.html", summary: "Another entry in the decades-long line of postconviction appeals brought by James Aren Duckett, a former police officer convicted in a 1987 child murder." },
  { docket: "SC2026-1042", title: "Occhicone v. State", date: "2026-07-21", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2026-1042.html", summary: "Death-row appeal from a 1986 murder conviction, arising after the defendant returned armed to his ex-girlfriend's home after being turned away." },
  { docket: "SC2024-0380", title: "Johnson v. State of Florida", date: "2026-07-16", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2024-0380.html", summary: "Appeal from a case in which a 17-year-old planned and carried out a knife attack at a sleepover, killing one person and injuring two others." },
  { docket: "SC2024-0931", title: "Brown v. State of Florida", date: "2026-07-16", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2024-0931.html", summary: "Appeal from a 2010 case in which the defendant, her teenage daughter, and a third person kidnapped and fatally assaulted a young woman." },
  { docket: "SC2024-0944", title: "Foster v. State of Florida", date: "2026-07-16", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2024-0944.html", summary: "No detailed summary published for this matter; see the official opinion via the link below." },
  { docket: "SC2024-1148", title: "McDowell v. State of Florida", date: "2026-07-16", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2024-1148.html", summary: "No detailed summary published for this matter; see the official opinion via the link below." },
  { docket: "SC2026-0690", title: "In re: Amendments to Florida Probate Rules — 2026 Legislation", date: "2026-07-16", category: "Rules & Administration", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2026-0690.html", summary: "Rulemaking order conforming the Florida Probate Rules to legislative changes enacted in 2026." },
  { docket: "SC2020-0529", title: "The Florida Bar v. Crowley", date: "2026-07-09", category: "Attorney Discipline", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2020-0529.html", summary: "Attorney disciplinary proceeding resolved by the Court." },
  { docket: "SC2023-1576", title: "Bouayad v. Normandy Insurance Company", date: "2026-07-09", category: "Civil", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2023-1576.html", summary: "Insurance-coverage dispute arising after a car-rental manager was shot multiple times outside an Orlando-area hotel." },
  { docket: "SC2024-0428", title: "Stewart v. Vindel", date: "2026-07-09", category: "Civil", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2024-0428.html", summary: "Family-law dispute over division of marital assets following a 2018 divorce filing in which the trial court reserved several issues for later ruling." },
  { docket: "SC2024-0669", title: "Publix Supermarkets, Inc. v. Goga", date: "2026-07-09", category: "Civil", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2024-0669.html", summary: "Slip-and-fall premises-liability suit against a grocery chain, addressing what the customer's conduct after the fall means for her claim." },
  { docket: "SC2024-0990", title: "Matt v. State of Florida", date: "2026-07-09", category: "Civil", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2024-0990.html", summary: "Dispute over bonds issued in 2019 by a recreation district formed the year before to manage a residential community's club and golf facilities." },
  { docket: "SC2026-0449 · SC2026-0450", title: "Duckett v. State", date: "2026-07-08", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2026-0449.html", summary: "After a death warrant issued, the circuit court allowed new DNA testing in this decades-old case; results came back inconclusive and the Court affirmed denial of relief." },
  { docket: "SC2026-0971", title: "Sochor v. State", date: "2026-07-08", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2026-0971.html", summary: "Postconviction appeal after a 2026 death warrant, raising a Brady/Giglio claim and a facial challenge to the state's lethal-injection protocol." },
  { docket: "SC2024-1099", title: "Rhodes v. State of Florida", date: "2026-07-02", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2024-1099.html", summary: "Death-penalty appeal from a murder conviction in which the victim's body was found in construction debris weeks after she disappeared." },
  { docket: "SC2024-1274", title: "Trace Elements, Inc. v. Mackensen", date: "2026-07-02", category: "Civil", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2024-1274.html", summary: "Contract dispute between a homeowner couple and a design firm that left a vacation-rental renovation unfinished." },
  { docket: "SC2025-0636", title: "The Florida Bar v. Hidalgo", date: "2026-07-02", category: "Attorney Discipline", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2025-0636.html", summary: "Attorney disciplinary proceeding resolved by the Court." },
  { docket: "SC2026-0142", title: "Albisu v. State of Florida", date: "2026-07-02", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2026-0142.html", summary: "No detailed summary published for this matter; see the official opinion via the link below." },
  { docket: "SC2026-0959", title: "Duckett v. State of Florida", date: "2026-07-01", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2026-0959.html", summary: "Another matter in the same long-running Duckett capital litigation; no detailed summary published." },
  { docket: "SC2022-1176", title: "Roberts v. State of Florida", date: "2026-06-25", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2022-1176.html", summary: "Murder appeal from a 2017 case in which the defendant's girlfriend became unresponsive after an argument and was later found dead." },
  { docket: "SC2024-0647", title: "State of Florida v. Times", date: "2026-06-25", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2024-0647.html", summary: "State's appeal in a drug-trafficking case concerning officers' knock-and-announce execution of a search warrant in Leon County." },
  { docket: "SC2025-1478", title: "In re: Amendments to Florida Probate Rules", date: "2026-06-25", category: "Rules & Administration", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2025-1478.html", summary: "Rulemaking order amending the Florida Probate Rules." },
  { docket: "SC2022-1457", title: "Parrish v. State of Florida", date: "2026-06-18", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2022-1457.html", summary: "Appeal by a defendant convicted of sexual battery and related offenses committed as a juvenile, challenging the sentence imposed." },
  { docket: "SC2024-0648", title: "Harvey v. State of Florida", date: "2026-06-18", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2024-0648.html", summary: "Direct appeal in a decades-old double-murder case where the defendant was convicted in 1986 and sentenced to death on both counts." },
  { docket: "SC2025-1357", title: "Whitton v. State of Florida", date: "2026-06-18", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2025-1357.html", summary: "Postconviction appeal from a 1992 robbery-murder conviction that relied partly on a jailhouse informant's testimony." },
  { docket: "SC2025-1462", title: "In re: Amendments to Florida Probate Rules", date: "2026-06-18", category: "Rules & Administration", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2025-1462.html", summary: "Rulemaking order amending the Florida Probate Rules." },
  { docket: "SC2026-0880", title: "Spencer v. State", date: "2026-06-18", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2026-0880.html", summary: "Appeal from a 1992 murder conviction following a documented history of violent altercations between the defendant and his wife." },
  { docket: "SC2024-0058", title: "Perlmutter v. Federal Insurance Company", date: "2026-06-11", category: "Civil", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2024-0058.html", summary: "Defamation dispute among Palm Beach residents, including counterclaims, arising from an alleged hate-mail campaign." },
  { docket: "SC2024-0232 · SC2024-1127", title: "Woodbury v. State of Florida", date: "2026-06-11", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2024-0232.html", summary: "Combined direct and postconviction appeal; no detailed summary published." },
  { docket: "SC2024-1528", title: "The Florida Bar v. Chesebro", date: "2026-06-11", category: "Attorney Discipline", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2024-1528.html", summary: "Attorney disciplinary proceeding before the Florida Bar." },
  { docket: "SC2025-0241", title: "In re: Amendments to Florida Rules of Appellate Procedure", date: "2026-06-11", category: "Rules & Administration", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2025-0241.html", summary: "Rulemaking order updating procedures that govern how appeals move through Florida's courts." },
  { docket: "SC2025-1362", title: "In re: Amendments to Florida Rules of Juvenile Procedure 8.203 and 8.330", date: "2026-06-11", category: "Rules & Administration", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2025-1362.html", summary: "Rulemaking order revising two provisions governing juvenile-court procedure." },
  { docket: "SC2026-0857", title: "Equal Ground Education Fund, Inc. v. Secretary, Florida Dept. of State", date: "2026-06-10", category: "Elections & Public Bodies", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2026-0857.html", summary: "Case involving a voter-education organization and Florida's chief elections officer; no detailed summary published." },
  { docket: "SC2023-0988", title: "Citizens of the State of Florida v. Florida Public Service Commission", date: "2026-06-04", category: "Civil", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2023-0988.html", summary: "Challenge to the Public Service Commission's approval of a multi-year utility rate plan, including related accounting treatment." },
  { docket: "SC2025-1254", title: "In re: Amendments to Florida Small Claims Rule 7.070", date: "2026-06-04", category: "Rules & Administration", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2025-1254.html", summary: "Rulemaking order amending the small-claims rule." },
  { docket: "SC2025-1730", title: "In re: Amendments to Rules Regulating the Florida Bar — Rule 5-1.1", date: "2026-06-04", category: "Rules & Administration", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2025-1730.html", summary: "Rulemaking order amending trust-accounting requirements for Florida attorneys." },
  { docket: "SC2024-1835", title: "Gessner v. Southern Company", date: "2026-05-28", category: "Civil", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2024-1835.html", summary: "Employment dispute over whether a worker's termination, attributed by the employer to offensive language, was actually retaliation for raising safety concerns." },
  { docket: "SC2026-0673", title: "In re: Amendments to Florida Rule of General Practice and Judicial Administration 2.515", date: "2026-05-28", category: "Rules & Administration", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2026-0673.html", summary: "Rulemaking order amending a general-practice and judicial-administration rule." },
  { docket: "SC2026-0736", title: "Lukehart v. State", date: "2026-05-27", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2026-0736.html", summary: "Death-penalty appeal from the 1996 killing of a five-month-old child in Jacksonville by a man living with the infant's mother." },
  { docket: "SC2023-1498 · SC2024-0785", title: "Wilcox v. State of Florida", date: "2026-05-21", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2023-1498.html", summary: "Appeal from a 2008 murder conviction involving an armed kidnapping and robbery." },
  { docket: "SC2026-0210", title: "Mendivil v. The Florida Bar", date: "2026-05-21", category: "Attorney Discipline", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2026-0210.html", summary: "Matter between an individual and the Florida Bar; no detailed summary published." },
  { docket: "SC2026-0718", title: "Knight v. State", date: "2026-05-15", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2026-0718.html", summary: "Appeal from a double-murder conviction involving a mother and her four-year-old daughter, supported by forensic evidence." },
  { docket: "SC2023-1184", title: "Maye v. State of Florida", date: "2026-05-14", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2023-1184.html", summary: "Postconviction challenge to a mandatory life sentence imposed under Florida's Prison Releasee Reoffender statute for a 2002 robbery." },
  { docket: "SC2025-0725", title: "In re: Amendments to Florida Rules of General Practice and Judicial Administration 2.530 and 2.540", date: "2026-05-14", category: "Rules & Administration", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2025-0725.html", summary: "Rulemaking order amending two general-practice and judicial-administration rules." },
  { docket: "SC2026-0528", title: "Duckett v. State of Florida", date: "2026-04-30", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2026-0528.html", summary: "Death-row appeal over access to DNA testing data generated from decades-old evidence in the same long-running case." },
  { docket: "SC2025-1811", title: "Arce v. Chief Judge Osterhaus", date: "2026-04-23", category: "Judicial Conduct & Petitions", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2025-1811.html", summary: "Petition filed against a district chief judge; no detailed summary published." },
  { docket: "SC2026-0574", title: "Hitchcock v. State of Florida", date: "2026-04-23", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2026-0574.html", summary: "Appeal in one of Florida's longest-running capital postconviction cases; no detailed summary published." },
  { docket: "SC2023-1003", title: "Zieler v. State of Florida", date: "2026-04-16", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2023-1003.html", summary: "No detailed summary published for this matter; see the official opinion via the link below." },
  { docket: "SC2025-1172", title: "In re: Amendments to Rules Regulating the Florida Bar — Substance Use Terminology", date: "2026-04-16", category: "Rules & Administration", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2025-1172.html", summary: "Rulemaking order updating terminology used in bar rules addressing substance use." },
  { docket: "SC2026-0519 · SC2026-0526", title: "Willacy v. State", date: "2026-04-15", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2026-0519.html", summary: "Public-records dispute in a capital case seeking government communications about Florida's lethal-injection protocol." },
  { docket: "SC2023-1749", title: "Saffold v. State of Florida", date: "2026-03-19", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2023-1749.html", summary: "Appeal from convictions for armed sexual battery and kidnapping arising from an assault after the defendant drove the victim to a parking lot." },
  { docket: "SC2025-1347", title: "In re: Amendments to Rules Regulating the Florida Bar — Professionalism Expectations", date: "2026-03-19", category: "Rules & Administration", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2025-1347.html", summary: "Rulemaking order updating professionalism standards for Florida attorneys." },
  { docket: "SC2025-1458", title: "In re: Amendments to Florida Rules of Appellate Procedure", date: "2026-03-19", category: "Rules & Administration", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2025-1458.html", summary: "Rulemaking order amending the appellate procedure rules." },
  { docket: "SC2025-1319", title: "Inquiry Concerning a Judge — Woody Robert Clermont (JQC No. 2025-001)", date: "2026-03-12", category: "Judicial Conduct & Petitions", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2025-1319.html", summary: "Judicial Qualifications Commission inquiry concerning a sitting judge's conduct." },
  { docket: "SC2025-1415", title: "In re: Amendments to Florida Rule of Appellate Procedure 9.710", date: "2026-03-12", category: "Rules & Administration", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2025-1415.html", summary: "Rulemaking order amending an appellate procedure rule." },
  { docket: "SC2026-0336", title: "King v. State", date: "2026-03-10", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2026-0336.html", summary: "Death-penalty appeal from the 2008 kidnapping and murder of a Florida woman abducted from her home while caring for her children." },
  { docket: "SC2024-0096", title: "Hunt v. State of Florida", date: "2026-03-05", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2024-0096.html", summary: "No detailed summary published for this matter; see the official opinion via the link below." },
  { docket: "SC2026-0073", title: "In re: Amendment to Florida Rule of Appellate Procedure 9.140", date: "2026-03-05", category: "Rules & Administration", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2026-0073.html", summary: "Rulemaking order amending an appellate procedure rule." },
  { docket: "SC2023-1735 · SC2024-0876", title: "Bright v. State of Florida", date: "2026-02-26", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2023-1735.html", summary: "Death-penalty appeal from the hammer killing of two men in a Jacksonville home." },
  { docket: "SC2026-0250 · SC2026-0251", title: "Kearse v. State", date: "2026-02-25", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2026-0250.html", summary: "Capital resentencing appeal from the 1991 killing of a police officer during a traffic stop." },
  { docket: "SC2022-1671 · SC2023-0725", title: "State of Florida v. Kaczmar", date: "2026-02-19", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2022-1671.html", summary: "Capital case arising from a 2008 house fire in Green Cove Springs that revealed a homicide victim's body." },
  { docket: "SC2026-0214 · SC2026-0217", title: "Trotter v. State", date: "2026-02-17", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2026-0214.html", summary: "Death-penalty appeal from the 1986 robbery and fatal stabbing of an elderly store owner." },
  { docket: "SC2026-0112 · SC2026-0113", title: "Heath v. State of Florida", date: "2026-02-03", category: "Criminal & Capital", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2026-0112.html", summary: "Death-penalty appeal from a 1989 Alachua County murder committed during a robbery planned with the defendant's brother." },
  { docket: "SC2025-1378", title: "In re: Amendment to Florida Rule of Appellate Procedure 9.200", date: "2026-01-22", category: "Rules & Administration", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2025-1378.html", summary: "Rulemaking order amending an appellate procedure rule." },
  { docket: "SC2024-0779", title: "In re: Amendments to Florida Rules of Civil Procedure 1.350 and 1.370", date: "2026-01-15", category: "Rules & Administration", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2024-0779.html", summary: "Rulemaking order amending two civil procedure rules." },
  { docket: "SC2025-0582", title: "In re: Amendments to Florida Rules of Civil Procedure 1.070, 1.430, and Form 1.902", date: "2026-01-15", category: "Rules & Administration", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2025-0582.html", summary: "Rulemaking order amending civil procedure rules and an associated form." },
  { docket: "SC2025-2064", title: "In re: Amendments to Rules Regulating the Florida Bar and Rules of the Supreme Court Relating to Admissions to the Bar", date: "2026-01-15", category: "Rules & Administration", url: "https://law.justia.com/cases/florida/supreme-court/2026/sc2025-2064.html", summary: "Rulemaking order amending bar-admission rules." },
];


const CASES_2025 = [
  { docket: "SC2024-1011 · SC2024-1647", title: "James Terry Colley, Jr. v. State of Florida", date: "2025-12-30", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-1088", title: "State v. Repple", date: "2025-12-30", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-1184 · SC2024-1190", title: "Brito v. Salas", date: "2025-12-30", category: "Civil", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-1298", title: "Michael James Jackson v. State of Florida", date: "2025-12-18", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-0096", title: "Michael H. Hunt v. State of Florida", date: "2025-12-18", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-0652", title: "State Attorneys for the Second, Seventh and Ninth Judicial Circuits v. Florida Pace Funding Agency", date: "2025-12-18", category: "Civil", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-1403", title: "In Re: Amendments to Florida Rules of General Practice and Judicial Administration", date: "2025-12-18", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-1173", title: "In Re: Amendments to Rules Regulating The Florida Bar - Rule 4-8.6", date: "2025-12-18", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-1180", title: "In Re: Amendments to Rules Regulating The Florida Bar - Chapter 3", date: "2025-12-18", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-1750", title: "In Re: Amendment to Florida Rule of General Practice and Judicial Administration 2.140", date: "2025-12-18", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-1256", title: "Loumpos v. Bank One", date: "2025-12-11", category: "Civil", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-1915 · SC2025-1917", title: "Frank A. Walls v. State of Florida", date: "2025-12-11", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-1470", title: "Florida Atlantic University Board of Trustees v. Harbor Branch Oceanographic Institute Foundation, Inc.", date: "2025-12-04", category: "Civil", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-1512", title: "David Kelsey Sparre v. State of Florida", date: "2025-12-04", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-0622", title: "The Florida Bar v. Robert Michael Fojo", date: "2025-11-26", category: "Attorney Discipline", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0530", title: "In Re: Amendments to the Florida Rules of Criminal Procedure - 2025 Legislation", date: "2025-11-26", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-1808", title: "In Re: Certification of Need for Additional Judges", date: "2025-11-26", category: "Civil", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0017", title: "In Re: Amendments to Rules Regulating The Florida Bar - Rules 6-3.5 and 6-3.6", date: "2025-11-20", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2022-0575", title: "In Re: Amendments to Florida Rules of Civil Procedure 1.440 and 1.500", date: "2025-11-13", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0045", title: "In Re: Amendments to Florida Rule of Civil Procedure 1.442 and Forms 1.902 and 1.938", date: "2025-11-13", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-1722 · SC2025-1723", title: "Richard Barry Randolph v. State of Florida", date: "2025-11-13", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-1219", title: "The Florida Bar v. Larry Elliot Klayman", date: "2025-11-06", category: "Attorney Discipline", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-1609 · SC2024-0294", title: "In Re: Amendments to Florida Rules of Traffic Court", date: "2025-11-06", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0659", title: "In Re: Amendments to Florida Evidence Code", date: "2025-11-06", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-1496", title: "In Re: Amendments to Florida Rules of Criminal Procedure - 2025 Legislation", date: "2025-11-06", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-1642 · SC2025-1686 · SC2025-1687", title: "Bryan Fredrick Jennings v. State of Florida", date: "2025-11-06", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-0839", title: "In Re: Amendments to Florida Rule of Criminal Procedure 3.190", date: "2025-10-30", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0448 · SC2025-0451", title: "The Florida Bar v. Lee David Sarkin", date: "2025-10-30", category: "Attorney Discipline", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0667", title: "In Re: Amendments to Florida Probate Rule 5.010", date: "2025-10-30", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-1765", title: "In Re: Amendments to Florida Small Claims Rules 7.010 and 7.020", date: "2025-10-23", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-1036", title: "In Re: Amendments to Florida Rule of Criminal Procedure 3.992", date: "2025-10-23", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0237", title: "In Re: Amendments to Florida Rules of Juvenile Procedure", date: "2025-10-16", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-0807", title: "Oquendo v. State of Florida", date: "2025-10-09", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-1507", title: "Smithers v. State", date: "2025-10-07", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-1476 · SC2024-0565", title: "Damas v. State of Florida", date: "2025-10-03", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0158", title: "In Re: Amendments to Florida Rules of Criminal Procedure 3.850 and 3.853", date: "2025-09-25", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0216", title: "In Re: Amendments to Florida Rule of Criminal Procedure 3.131", date: "2025-09-25", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-1422 · SC2025-1423", title: "Jones v. State", date: "2025-09-24", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-0593", title: "Pryor v. State of Florida", date: "2025-09-18", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-1241", title: "The Florida Bar v. Alejandro L. Marriaga", date: "2025-09-18", category: "Attorney Discipline", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-1763", title: "In Re: Amendments to Florida Rule of Traffic Court 6.450", date: "2025-09-11", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-1778", title: "In Re: Amendments to Florida Rules of General Practice and Judicial Administration", date: "2025-09-11", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-1862", title: "Teresa Gaffney v. Phillip A. Baumann, etc., et al.", date: "2025-09-11", category: "Civil", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-1320", title: "David Joseph Pittman v. State of Florida", date: "2025-09-10", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-0660 · SC2024-0702", title: "Suggs v. State of Florida", date: "2025-09-04", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-1461", title: "In Re: Amendments to Florida Rule of Criminal Procedure 3.220", date: "2025-09-04", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-1181", title: "In Re: Amendments to Florida Rule of Appellate Procedure - 2025 Legislation", date: "2025-09-04", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-1264 · SC2024-1556", title: "Bell v. State of Florida", date: "2025-08-28", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0019", title: "In Re: Amendments to Rules Regulating The Florida Bar - Discipline Rules", date: "2025-08-28", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0020", title: "In Re: Amendments to Rules Regulating The Florida Bar - Chapter 1", date: "2025-08-28", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0266", title: "In Re: Amendments to Florida Probate Rule 5.405", date: "2025-08-28", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-1040", title: "In Re: Amendments to Florida Probate Rules - 2025 Legislation", date: "2025-08-28", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-1179 · SC2025-1182", title: "Curtis Windom v. State of Florida", date: "2025-08-21", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-1127 · SC2025-1128", title: "Bates v. State", date: "2025-08-12", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-1009", title: "Zakrzewski v. State", date: "2025-07-22", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-0058", title: "Fletcher v. State of Florida", date: "2025-07-17", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-0126", title: "Rojas v. University of Florida Board of Trustees", date: "2025-07-17", category: "Civil", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-0915", title: "JJJTB, Inc. v. Schmidt", date: "2025-07-17", category: "Civil", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-1000", title: "Williams v. State of Florida", date: "2025-07-17", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-1671", title: "Black Voters Matter Capacity Building Institute, Inc. v. Secretary, Florida Department of State", date: "2025-07-17", category: "Elections & Public Bodies", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-0485", title: "Florida Rising, Inc. v. Florida Public Service Commission", date: "2025-07-17", category: "Civil", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-1128", title: "Davis v. State of Florida", date: "2025-07-17", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0071", title: "Inquiry Concerning a Judge JQC Nos. 2024-452, 2024-506 & 2025-161 Re: Stefanie C. Moon", date: "2025-07-17", category: "Judicial Conduct & Petitions", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-0696", title: "Jones v. State of Florida", date: "2025-07-10", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-1077", title: "Wolf v. State of Florida", date: "2025-07-10", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-0099", title: "Steak N Shake, Inc. v. Ramos", date: "2025-07-10", category: "Civil", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0713", title: "In Re: Amendments to Florida Rule of Criminal Procedure 3.040", date: "2025-07-10", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0891", title: "Bell v. State of Florida", date: "2025-07-08", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-1662 · SC2024-0543", title: "Allen v. State of Florida", date: "2025-07-03", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2022-0859 · SC2022-0860", title: "The Florida Bar v. Brooke Lynnette Girley", date: "2025-06-26", category: "Attorney Discipline", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-0003", title: "In Re: Amendments to the Florida Family Law Rules of Procedure - Forms", date: "2025-06-26", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-1779", title: "In Re: Amendments to Florida Rule of Juvenile Procedure 8.245", date: "2025-06-26", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-0421", title: "The Florida Bar v. Alexa Martinez", date: "2025-06-19", category: "Attorney Discipline", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-0539", title: "Steven J. Lorenzo v. State of Florida", date: "2025-06-19", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0697", title: "In Re: Amendments to Florida Rule of Civil Procedure 1.280(f)", date: "2025-06-19", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0794", title: "Thomas Lee Gudinas v. State of Florida", date: "2025-06-17", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-1355", title: "Parks v. State of Florida", date: "2025-06-12", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-1560", title: "In Re: Amendments to Florida Family Law Rule of Procedure 12.410", date: "2025-06-12", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-0095", title: "Bojorquez v. State", date: "2025-06-05", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0210", title: "In Re: Amendments to Florida Rules of Civil Procedure - Form 1.923(a)", date: "2025-06-05", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0727", title: "In Re: Amendments to Rules Regulating The Florida Bar", date: "2025-06-05", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0708", title: "Anthony Floyd Wainwright v. State of Florida", date: "2025-06-03", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0157", title: "In Re: Amendments to Rules Regulating The Florida Bar - Bylaws 2-4.1 and 2-8.2", date: "2025-05-29", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-0320", title: "Wilson v. State", date: "2025-05-22", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-0869", title: "The Florida Bar v. Ryan F. C. Mitchell", date: "2025-05-15", category: "Attorney Discipline", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-0160", title: "American Coastal Insurance Company v. Patios West One Condominium Association, Inc.", date: "2025-05-15", category: "Civil", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0018", title: "In Re: Amendments to Rules Regulating The Florida Bar - Rules 4-7.19 and 4-7.20", date: "2025-05-15", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-0992", title: "Inquiry Concerning a Judge JQC Nos. 2022-429, 2022-461 & 2022-502 Re: Hon. Mardi Levey Cohen", date: "2025-05-08", category: "Judicial Conduct & Petitions", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0278", title: "Inquiry Concerning a Judge JQC No. 2024-796 Re: Martha Cannon Adams", date: "2025-05-08", category: "Judicial Conduct & Petitions", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0585", title: "Rogers v. State", date: "2025-05-08", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0590", title: "Jeffrey G. Hutchinson v. State of Florida", date: "2025-04-30", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0517 · SC2025-0518", title: "Hutchinson v. State", date: "2025-04-25", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-1293", title: "In Re: Amendments to Florida Rule of Traffic Court 6.445", date: "2025-04-17", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-1471", title: "In Re: Amendments to Florida Rules of Criminal Procedure 3.220, 3.851, and 3.853", date: "2025-04-10", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-0883", title: "In Re: Amendments to Florida Rules of Criminal Procedure 3.116 and 3.132", date: "2025-04-03", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0371 · SC2025-0372 · SC2025-0424", title: "Tanzi v. State", date: "2025-04-01", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2022-1042", title: "Vericker v. Powell", date: "2025-03-27", category: "Civil", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-1798", title: "In Re: Amendments to Florida Rule of Appellate Procedure 9.130", date: "2025-03-27", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-1401", title: "In Re: Amendments to Florida Rules of General Practice and Judicial Administration", date: "2025-03-20", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-0773", title: "In Re: Amendments to Florida Probate Rules", date: "2025-03-20", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2022-1123", title: "In Re: Amendments to Florida Rule of Criminal Procedure 3.191", date: "2025-03-13", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-0416", title: "The Florida Bar v. Danielle Renee Watson", date: "2025-03-13", category: "Attorney Discipline", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-0518", title: "The Florida Bar v. Malik Leigh", date: "2025-03-13", category: "Attorney Discipline", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0280 · SC2025-0281", title: "Edward T. James v. State of Florida", date: "2025-03-13", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-0317", title: "In Re: Amendments to Florida Rules of Appellate Procedure", date: "2025-03-06", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2022-0472", title: "The Florida Bar v. Charlie Easa Farah, Jr.", date: "2025-02-27", category: "Attorney Discipline", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-1057", title: "In Re: Amendments to Florida Probate Rules - 2024 Legislation", date: "2025-02-27", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-1171", title: "In Re: Amendments to Florida Rule of Criminal Procedure 3.802", date: "2025-02-20", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-1717", title: "In Re: Amendments to Florida Rules of Juvenile Procedure", date: "2025-02-20", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-1315", title: "Charlene Rosa v. State of Florida", date: "2025-02-13", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0016", title: "In Re: Amendments to Florida Rules of Juvenile Procedure - 2024 Legislation", date: "2025-02-13", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0162", title: "Mayfield v. Secretary, Florida Department of State", date: "2025-02-13", category: "Elections & Public Bodies", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2025-0110", title: "Ford v. State", date: "2025-02-07", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2024-0774", title: "In Re: Amendments to Florida Rules of Civil Procedure", date: "2025-02-06", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-0338", title: "Caylor v. State", date: "2025-01-30", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-1123", title: "Wayne C. Doty v. State of Florida", date: "2025-01-16", category: "Criminal & Capital", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
  { docket: "SC2023-1373", title: "In Re: Amendments to Florida Rule of General Practice and Judicial Administration 2.140", date: "2025-01-09", category: "Rules & Administration", term: 2025, summary: "", url: "https://law.justia.com/cases/florida/supreme-court/2025/" },
];

// Unified corpus. Term is derived from the decision date, so no per-record
// bookkeeping is needed. 2026 records carry summaries; 2025 is analytics-grade
// (caption, docket, date, machine-assigned category).
const ALL_CASES = [...CASES, ...CASES_2025];

const CATEGORY_STYLE = {
  "Criminal & Capital": "#B5453F",
  "Civil": "#14424F",
  "Attorney Discipline": "#D9A62E",
  "Rules & Administration": "#3E5C63",
  "Elections & Public Bodies": "#2E5339",
  "Judicial Conduct & Petitions": "#8C5A2B",
};

const CATEGORIES = ["All", ...Object.keys(CATEGORY_STYLE)];
const JUSTICES = [
  {
    id: "couriel",
    name: "John D. Couriel",
    title: "Chief Justice",
    since: "Justice since 2020 · Chief Justice since July 2026",
    appointedBy: "Appointed by Gov. Ron DeSantis, June 2020. Elected Chief Justice by his colleagues for a two-year term beginning July 1, 2026, succeeding Carlos Muñiz.",
    background: "Raised in Miami, the son of Cuban exiles — his father arrived as one of roughly 14,000 unaccompanied children airlifted out of Cuba under Operation Pedro Pan. Harvard College and Harvard Law School; clerked for a federal district judge in Washington; practiced securities and M&A law in New York before returning to Florida as a federal prosecutor, trying money-laundering, public-corruption, and human-trafficking cases in Miami.",
    philosophy: "A Federalist Society member since 2000, Couriel describes his approach as textualist — reading a statute's words as they were written, rather than inferring what the legislature might have intended.",
    outlook: "As the Court's newest Chief Justice, expect continuity rather than a change in direction: Couriel inherits an administrative agenda (case-processing speed, rule modernization) rather than a mandate to shift the Court's substantive jurisprudence, which he has shared for six years already.",
  },
  {
    id: "muniz",
    name: "Carlos G. Muñiz",
    title: "Justice",
    since: "Justice since 2019 · Chief Justice 2022–2026",
    appointedBy: "Appointed by Gov. Ron DeSantis, January 2019, as part of a wave of appointments that reshaped the Court.",
    background: "Born in Chicago; University of Virginia and Yale Law School. Held senior legal posts across three levels of government — deputy attorney general and chief of staff to Florida Attorney General Pam Bondi, general counsel of the Florida Department of Financial Services, and general counsel of the U.S. Department of Education under Secretary Betsy DeVos — before joining the bench with no prior judicial experience.",
    philosophy: "Widely described as a committed textualist; commentators at the time of his appointment compared his approach to Justice Clarence Thomas's. As Chief Justice, he emphasized court efficiency and resolving civil cases faster.",
    outlook: "Having just completed a four-year turn as Chief Justice, Muñiz returns to the ordinary docket with an institutional focus — case-management and rules matters are where his imprint has been most visible, more so than any single ideological throughline in his opinions.",
  },
  {
    id: "labarga",
    name: "Jorge Labarga",
    title: "Justice",
    since: "Justice since 2009 · Chief Justice 2014–2018",
    appointedBy: "Appointed by Gov. Charlie Crist in 2009 — the only current justice not appointed by Gov. Ron DeSantis.",
    background: "Born in Havana, Cuba, in 1952; arrived in Florida as a child and settled in Pahokee. Double Gator (BA and JD, University of Florida). Assistant public defender, then a state attorney's office trial lawyer, before Gov. Lawton Chiles appointed him to the circuit bench in 1996. Elevated to the 4th District Court of Appeal and then the Supreme Court by Gov. Crist in 2009. Served as the Court's first Cuban-American Chief Justice, 2014–2018, and was the first justice since 1865 reelected by peers to a second term as Chief.",
    philosophy: "A 2020 Ballotpedia study of state supreme court partisanship scored Labarga's pre-bench record as only 'mild Republican' — the most moderate rating on the current Court by a clear margin. He has spoken about the value of a bench whose members bring different life stories to the table, a more institutionalist framing than the originalism his colleagues tend to invoke.",
    outlook: "As the lone holdover from a different governor's era, Labarga is the bench's most independent vote by composition alone, though he rarely dissents publicly. He must retire at the mandatory age of 75 in October 2028, before the next retention election — meaning his seat is very likely to flip to a DeSantis appointee within two years regardless of how any single case comes out.",
  },
  {
    id: "francis",
    name: "Renatha Francis",
    title: "Justice",
    since: "Justice since 2022",
    appointedBy: "First appointed by Gov. DeSantis in 2020; that appointment was set aside by the Court itself because she had not yet held Bar membership for the constitutionally required 10 years. DeSantis reappointed her once she met the requirement, and she was seated in September 2022.",
    background: "Born in Portmore, Jamaica, and raised in Kingston, where she ran small businesses as a full-time student. University of the West Indies, then law school in Jacksonville. Judge in Miami-Dade and Palm Beach county and circuit courts before her Supreme Court seat — the first Caribbean-American and second Black woman to serve on the Florida Supreme Court.",
    philosophy: "Francis has a shorter public paper trail than colleagues who came up through the appellate courts; her background is unusually trial-heavy, spanning family, civil, probate, and criminal dockets rather than appellate practice.",
    outlook: "Retained by voters in 2024 with about 63% of the vote, giving her a full term to build an appellate record. Her trial-court background suggests a closer read of case-specific facts in family-law and probate matters than justices whose careers ran mostly through appellate courts and government counsel's offices.",
  },
  {
    id: "grosshans",
    name: "Jamie R. Grosshans",
    title: "Justice",
    since: "Justice since 2020",
    appointedBy: "Appointed by Gov. Ron DeSantis, September 2020.",
    background: "Raised in Brookhaven, Mississippi. University of Mississippi School of Law, cum laude. Assistant state attorney in Orange County, then a decade in private practice focused on family law and criminal defense, followed by an Orange County judgeship and the 5th District Court of Appeal (Gov. Rick Scott, 2018) before her Supreme Court seat.",
    philosophy: "Self-identifies as a textualist in the Federalist Society tradition. Retained by voters in 2022 with roughly 64% of the vote.",
    outlook: "Her decade in family-law and criminal-defense practice, longer trial experience than most of her colleagues, points toward closer attention to procedural and evidentiary detail in the family-law and criminal matters that make up a large share of the docket.",
  },
  {
    id: "sasso",
    name: "Meredith Sasso",
    title: "Justice",
    since: "Justice since 2023",
    appointedBy: "Appointed by Gov. Ron DeSantis, May 2023.",
    background: "Raised in Tallahassee; University of Florida for both her undergraduate and law degrees. Practiced liability and negligence litigation, served as a guardian ad litem for abused and neglected children, then became chief deputy general counsel to Gov. Rick Scott. Named to the 5th District Court of Appeal in 2019, then became the first Chief Judge of the newly created 6th District Court of Appeal in 2023 before her elevation.",
    philosophy: "A member of the Federalist Society and the American Enterprise Institute's Leadership Network; colleagues at her investiture described her appellate record as rooted in originalism and textualism.",
    outlook: "The youngest member of the Court and the newest before Tanenbaum's arrival, with the least tenure to have shaped precedent so far — her opinions in civil and appellate-procedure cases are the more useful signal of her approach than any prediction based on background alone.",
  },
  {
    id: "tanenbaum",
    name: "Adam Tanenbaum",
    title: "Justice",
    since: "Justice since January 2026",
    appointedBy: "Appointed by Gov. Ron DeSantis, January 14, 2026, filling the seat vacated by the retirement of Justice Charles Canady — DeSantis's sixth appointment to the seven-member Court.",
    background: "Grew up in Pinellas County (Seminole High School). University of Florida (co-valedictorian, Phi Beta Kappa), Georgetown Law. Chief deputy solicitor general and general counsel to both the Florida Department of State and the Florida House of Representatives before six years on the 1st District Court of Appeal, where he wrote more than 90 majority opinions and three of the court's seven en banc rulings.",
    philosophy: "Describes himself as an originalist, saying at his appointment that a judge's role is to find a law's original meaning rather than to exercise independent will — a formulation he traced to Justice Clarence Thomas.",
    outlook: "The newest justice, with the most recent and extensive appellate writing record of anyone on the bench — his 1st DCA opinions on election law and separation-of-powers questions are the clearest available preview of how he'll approach similar constitutional questions here.",
  },
];



// ---------------------------------------------------------------------------
// Docket analytics. Every Florida Supreme Court docket number encodes the year
// the matter was filed (SC2024-0380 = filed 2024). Paired with the decision
// date, that yields a disposition lag for every case — a measure neither the
// official docket portal nor the free opinion archives expose.
//
// Precision note: docket numbers carry the filing YEAR, not an exact filing
// date, so lag is measured from January 1 of the filing year. It is a
// consistent comparator across cases, not a precise pendency clock.
// ---------------------------------------------------------------------------

function filingYear(docket) {
  const m = docket.match(/SC(\d{4})-/);
  return m ? parseInt(m[1], 10) : null;
}

function dispositionDays(c) {
  const fy = filingYear(c.docket);
  if (!fy) return null;
  const start = Date.UTC(fy, 0, 1);
  const [y, mo, d] = c.date.split("-").map(Number);
  return Math.round((Date.UTC(y, mo - 1, d) - start) / 86400000);
}

function median(nums) {
  if (!nums.length) return null;
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : Math.round((s[mid - 1] + s[mid]) / 2);
}

function caseUid(c) { return `${c.docket}|${c.date}`; }

function enrichCases(cases) {
  return cases.map((c) => {
    const fy = filingYear(c.docket);
    const days = dispositionDays(c);
    const decidedYear = parseInt(c.date.slice(0, 4), 10);
    return { ...c, uid: caseUid(c), filingYear: fy, days, term: decidedYear, sameYear: fy !== null && fy === decidedYear };
  });
}

function twoClockAnalysis(enriched) {
  const capital = enriched.filter((c) => c.category === "Criminal & Capital" && c.days !== null);
  const expedited = capital.filter((c) => c.sameYear);
  const ordinary = capital.filter((c) => !c.sameYear);
  const em = median(expedited.map((c) => c.days));
  const om = median(ordinary.map((c) => c.days));
  return { expedited, ordinary, expeditedMedian: em, ordinaryMedian: om, ratio: em && om ? om / em : null };
}

function monthlyCounts(enriched) {
  const names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const counts = new Array(12).fill(0);
  enriched.forEach((c) => { counts[parseInt(c.date.slice(5, 7), 10) - 1] += 1; });
  const last = counts.reduce((acc, v, i) => (v > 0 ? i : acc), 0);
  return counts.slice(0, last + 1).map((count, i) => ({ month: names[i], count }));
}

// Replication check: the two-clock split is recomputed independently for each
// term. A finding that only appears in one year is an artifact, not a pattern.
function replicationByTerm(enriched) {
  const terms = [...new Set(enriched.map((c) => c.term))].sort();
  return terms.map((term) => {
    const scope = enriched.filter((c) => c.term === term);
    const tc = twoClockAnalysis(scope);
    return { term, n: scope.length, ...tc };
  });
}

function categoryVelocity(enriched) {
  const byCat = {};
  enriched.forEach((c) => {
    if (c.days === null) return;
    (byCat[c.category] = byCat[c.category] || []).push(c.days);
  });
  return Object.entries(byCat)
    .map(([category, arr]) => ({ category, n: arr.length, median: median(arr), min: Math.min(...arr), max: Math.max(...arr) }))
    .sort((a, b) => a.median - b.median);
}

function cohortBacklog(enriched) {
  const counts = {};
  enriched.forEach((c) => { if (c.filingYear !== null) counts[c.filingYear] = (counts[c.filingYear] || 0) + 1; });
  return Object.keys(counts).map(Number).sort((a, b) => a - b).map((year) => ({ year, count: counts[year] }));
}

const STOP_TOKENS = new Set(["inc", "llc", "corp", "co", "company", "commission", "ltd", "dept", "department", "state", "florida"]);

function isGenericParty(s) {
  const t = s.trim();
  return /^(the\s+)?florida\s+bar$/i.test(t) || /^state(\s+of\s+florida)?$/i.test(t) ||
    /^citizens of the state of florida$/i.test(t) || /^chief judge/i.test(t);
}

function extractLitigant(title) {
  const m = title.match(/^(.*?)\s+v\.\s+(.*)$/i);
  if (!m) return null;
  const [, a, b] = m;
  let candidate;
  if (isGenericParty(a) && !isGenericParty(b)) candidate = b;
  else if (isGenericParty(b) && !isGenericParty(a)) candidate = a;
  else if (isGenericParty(a) && isGenericParty(b)) return null;
  else candidate = a;
  const tokens = candidate.trim().replace(/,$/, "").split(/\s+/);
  const last = tokens[tokens.length - 1].replace(/[.,]/g, "").toLowerCase();
  if (STOP_TOKENS.has(last)) return null;
  return last;
}

function repeatLitigants(enriched) {
  const groups = {};
  enriched.forEach((c) => { const k = extractLitigant(c.title); if (k) (groups[k] = groups[k] || []).push(c); });
  return Object.entries(groups)
    .filter(([, v]) => v.length > 1)
    .map(([key, v]) => ({ key, cases: v.sort((a, b) => b.date.localeCompare(a.date)) }))
    .sort((a, b) => b.cases.length - a.cases.length);
}

// Adapter status per court. Florida and Georgia docket formats have both been
// parsed and verified; the remaining states are unverified until their formats
// are actually checked.
const COVERAGE = [
  { court: "Supreme Court of Florida", format: "SC2024-0380 — four-digit filing year", status: "live", note: "185 matters ingested across the 2025 and 2026 terms." },
  { court: "Supreme Court of Georgia", format: "S26A0374 — two-digit year plus a term letter", status: "ready", note: "Adapter written and verified against real dockets. The term letter also encodes case type, which Florida's format does not." },
  { court: "Other state appellate courts", format: "format varies", status: "unverified", note: "Unverified. Each court's docket format has to be checked before any claim about coverage is made." },
];

const CATEGORY_DESCRIPTIONS = {
  "Criminal & Capital": "Direct appeals and postconviction proceedings in criminal cases. Most are tied to death sentences, since capital appeals fall within the Court's mandatory jurisdiction under the Florida Constitution.",
  "Civil": "Private civil disputes and the mandatory-jurisdiction public-utility rate cases that reach the Court directly, plus cases arriving by certified conflict or certified question.",
  "Attorney Discipline": "Bar disciplinary proceedings, over which the Court holds inherent constitutional authority as the regulator of the legal profession.",
  "Rules & Administration": "Rulemaking orders amending the procedural rules and ethics rules that govern Florida's courts and its licensed attorneys.",
  "Elections & Public Bodies": "Cases involving state election administration and other public bodies.",
  "Judicial Conduct & Petitions": "Judicial Qualifications Commission inquiries and original writ petitions concerning sitting judges.",
};

// --- Persistence -----------------------------------------------------------
// Watchlists and notes survive across sessions where the storage API is
// available, and degrade silently to in-memory state where it is not.
const store = {
  async get(key, fallback) {
    try {
      if (typeof window !== "undefined" && window.storage) {
        const r = await window.storage.get(key);
        if (r && r.value) return JSON.parse(r.value);
      }
    } catch (e) { /* key absent or storage unavailable */ }
    return fallback;
  },
  async set(key, value) {
    try {
      if (typeof window !== "undefined" && window.storage) {
        await window.storage.set(key, JSON.stringify(value));
        return true;
      }
    } catch (e) { /* storage unavailable; in-memory state still holds */ }
    return false;
  },
};

function formatDate(iso) {
  const [y, m, d] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(m, 10) - 1]} ${parseInt(d, 10)}, ${y}`;
}

function formatLag(days) {
  if (days === null || days === undefined) return "—";
  if (days < 365) return `${days}d`;
  const yrs = days / 365;
  return `${yrs.toFixed(1)}y`;
}

function downloadBlob(content, filename, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function toCSV(rows) {
  const header = ["docket", "title", "date", "category", "filingYear", "days", "summary", "url"];
  const escape = (v) => `"${String(v === null || v === undefined ? "" : v).replace(/"/g, '""')}"`;
  return [header.join(","), ...rows.map((r) => header.map((h) => escape(r[h])).join(","))].join("\n");
}

// --- Marks -----------------------------------------------------------------
function ThemisMark({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" aria-hidden="true">
      <circle cx="30" cy="30" r="28" stroke="var(--citrus)" strokeWidth="1.4" />
      <circle cx="30" cy="30" r="23" stroke="var(--citrus)" strokeWidth="0.6" strokeDasharray="1.2 2.6" />
      <path d="M30 16 v6" stroke="var(--gulf)" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="30" cy="14" r="2.6" stroke="var(--gulf)" strokeWidth="1.3" />
      <path d="M27.4 13.3 h5.2" stroke="var(--gulf)" strokeWidth="1" strokeLinecap="round" />
      <path d="M30 22 c-5 0 -8 3 -8 7 v3 h16 v-3 c0 -4 -3 -7 -8 -7 z" stroke="var(--gulf)" strokeWidth="1.3" fill="none" />
      <path d="M20 24 v10 M14 25 h12 M14 25 l-2.4 5 h4.8 z M26 25 l-2.4 5 h4.8 z" stroke="var(--gulf)" strokeWidth="0.9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 18 v16 M37 20 h6" stroke="var(--gulf)" strokeWidth="1.1" strokeLinecap="round" />
      <rect x="21" y="35" width="18" height="4" stroke="var(--gulf)" strokeWidth="1.1" fill="none" />
    </svg>
  );
}

function PalmDivider() {
  return (
    <svg className="fsc-divider" viewBox="0 0 200 20" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <path d="M100 18 C 95 10, 85 6, 70 5 M100 18 C 105 10, 115 6, 130 5 M100 18 C 97 8, 96 2, 92 -2 M100 18 C 103 8, 104 2, 108 -2 M100 18 C 90 12, 78 12, 65 15 M100 18 C 110 12, 122 12, 135 15"
        stroke="var(--palmetto)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <circle cx="100" cy="18" r="1.8" fill="var(--palmetto)" />
    </svg>
  );
}

// Signature visualization: every matter placed on a single time axis by how
// long it took to resolve. The bimodal shape is the finding.
function DispositionStrip({ cases, onSelect }) {
  const W = 1000, H = 190, PAD_L = 40, PAD_R = 20, TOP = 26, BOT = 34;
  const withDays = cases.filter((c) => c.days !== null);
  if (!withDays.length) return null;
  const maxDays = Math.max(...withDays.map((c) => c.days));
  const maxYear = Math.ceil(maxDays / 365);
  const x = (d) => PAD_L + (d / maxDays) * (W - PAD_L - PAD_R);
  const band = H - TOP - BOT;
  const jitter = (i) => {
    const h = Math.sin(i * 12.9898) * 43758.5453;
    return (h - Math.floor(h)) * band + TOP;
  };
  const ticks = Array.from({ length: maxYear + 1 }, (_, i) => i);
  return (
    <svg className="fsc-strip" viewBox={`0 0 ${W} ${H}`} role="img"
      aria-label="Every matter plotted by time from filing year to decision">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={x(t * 365)} y1={TOP - 8} x2={x(t * 365)} y2={H - BOT + 6} stroke="var(--line)" strokeWidth="1" strokeDasharray="2 3" />
          <text x={x(t * 365)} y={H - BOT + 20} textAnchor="middle" className="fsc-strip-tick">{t === 0 ? "filed" : `${t}y`}</text>
        </g>
      ))}
      {withDays.map((c, i) => (
        <circle key={c.uid} cx={x(c.days)} cy={jitter(i)} r="5"
          fill={CATEGORY_STYLE[c.category]} fillOpacity="0.72"
          stroke="var(--sand)" strokeWidth="1"
          className="fsc-strip-dot" onClick={() => onSelect(c)}>
          <title>{`${c.title} — ${c.docket} — ${formatLag(c.days)}`}</title>
        </circle>
      ))}
    </svg>
  );
}

function MiniBarChart({ data }) {
  const max = Math.max(...data.map((d) => d.count));
  return (
    <div className="fsc-chart">
      {data.map((d) => (
        <div className="fsc-chart-col" key={d.month}>
          <div className="fsc-chart-bar-wrap">
            <div className="fsc-chart-bar" style={{ height: `${(d.count / max) * 100}%` }} title={`${d.month}: ${d.count}`} />
          </div>
          <div className="fsc-chart-count">{d.count}</div>
          <div className="fsc-chart-label">{d.month}</div>
        </div>
      ))}
    </div>
  );
}

function VelocityTable({ rows }) {
  const maxMedian = Math.max(...rows.map((r) => r.median));
  return (
    <div className="fsc-velocity">
      {rows.map((r) => (
        <div className="fsc-vel-row" key={r.category}>
          <span className="fsc-vel-dot" style={{ background: CATEGORY_STYLE[r.category] }} />
          <span className="fsc-vel-label">{r.category}</span>
          <span className="fsc-vel-n">n={r.n}</span>
          <span className="fsc-vel-bar-wrap">
            <span className="fsc-vel-bar" style={{ width: `${(r.median / maxMedian) * 100}%`, background: CATEGORY_STYLE[r.category] }} />
          </span>
          <span className="fsc-vel-val">{formatLag(r.median)}</span>
        </div>
      ))}
    </div>
  );
}

function CohortChart({ rows }) {
  const max = Math.max(...rows.map((r) => r.count));
  return (
    <div className="fsc-cohort">
      {rows.map((r) => (
        <div className="fsc-cohort-row" key={r.year}>
          <span className="fsc-cohort-year">{r.year}</span>
          <span className="fsc-cohort-bar-wrap">
            <span className="fsc-cohort-bar" style={{ width: `${(r.count / max) * 100}%` }} />
          </span>
          <span className="fsc-cohort-count">{r.count}</span>
        </div>
      ))}
    </div>
  );
}

function CitrusStamp({ category, rotate }) {
  const ink = CATEGORY_STYLE[category] || "#3E5C63";
  const rays = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <div className="stamp" style={{ color: ink, transform: `rotate(${rotate}deg)` }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        {rays.map((deg) => (
          <line key={deg} x1="50" y1="50" x2="50" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.5" transform={`rotate(${deg} 50 50)`} />
        ))}
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" strokeWidth="0.7" strokeDasharray="1.4 2.2" />
      </svg>
      <span className="stamp-status">{category}</span>
    </div>
  );
}

function JusticeCard({ justice, onOpen }) {
  return (
    <button className="fsc-justice-card" onClick={() => onOpen(justice)}>
      <div className="fsc-justice-initial">{justice.name.split(" ").map((w) => w[0]).slice(-2).join("")}</div>
      <div className="fsc-justice-name">{justice.name}</div>
      <div className="fsc-justice-title">{justice.title}</div>
      <div className="fsc-justice-since">{justice.since}</div>
    </button>
  );
}

export default function FloridaSupremeCourtTracker() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [selected, setSelected] = useState(null);
  const [selectedJustice, setSelectedJustice] = useState(null);
  const [view, setView] = useState("list");
  const [term, setTerm] = useState("all");
  const [aboutOpen, setAboutOpen] = useState(false);
  const [outlookOpen, setOutlookOpen] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [notes, setNotes] = useState({});
  const [watchOnly, setWatchOnly] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const allEnriched = useMemo(() => enrichCases(ALL_CASES), []);
  const replication = useMemo(() => replicationByTerm(allEnriched), [allEnriched]);
  const enriched = useMemo(
    () => (term === "all" ? allEnriched : allEnriched.filter((c) => c.term === term)),
    [allEnriched, term]
  );
  const monthly = useMemo(() => monthlyCounts(enriched), [enriched]);
  const clocks = useMemo(() => twoClockAnalysis(enriched), [enriched]);
  const velocity = useMemo(() => categoryVelocity(enriched), [enriched]);
  const cohorts = useMemo(() => cohortBacklog(enriched), [enriched]);
  const recurring = useMemo(() => repeatLitigants(enriched), [enriched]);

  const categoryCounts = useMemo(() => {
    const counts = {};
    enriched.forEach((c) => { counts[c.category] = (counts[c.category] || 0) + 1; });
    return counts;
  }, [enriched]);
  const TERMS = ["all", 2026, 2025];
  const distinctDockets = useMemo(() => new Set(enriched.map((c) => c.docket)).size, [enriched]);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [w, n] = await Promise.all([
        store.get("fscr:watchlist", []),
        store.get("fscr:notes", {}),
      ]);
      if (!alive) return;
      if (Array.isArray(w)) setWatchlist(w);
      if (n && typeof n === "object") setNotes(n);
      setLoaded(true);
    })();
    return () => { alive = false; };
  }, []);

  useEffect(() => { if (loaded) store.set("fscr:watchlist", watchlist); }, [watchlist, loaded]);
  useEffect(() => { if (loaded) store.set("fscr:notes", notes); }, [notes, loaded]);

  const toggleWatch = (docket) => {
    setWatchlist((prev) => (prev.includes(docket) ? prev.filter((d) => d !== docket) : [...prev, docket]));
  };
  const setNote = (docket, text) => {
    setNotes((prev) => {
      const next = { ...prev };
      if (text.trim()) next[docket] = text; else delete next[docket];
      return next;
    });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = enriched.filter((c) => {
      if (watchOnly && !watchlist.includes(c.docket)) return false;
      if (category !== "All" && c.category !== category) return false;
      if (!q) return true;
      return c.title.toLowerCase().includes(q) || c.docket.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q);
    });
    const dir = sortDir === "desc" ? -1 : 1;
    list = [...list].sort((a, b) => {
      if (sortKey === "lag") return ((a.days ?? 0) - (b.days ?? 0)) * dir;
      return a.date.localeCompare(b.date) * dir;
    });
    return list;
  }, [enriched, query, category, sortKey, sortDir, watchOnly, watchlist]);

  const cycleSort = (key) => {
    if (sortKey === key) setSortDir(sortDir === "desc" ? "asc" : "desc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  return (
    <div className="fsc-root">
      <style>{`
        .fsc-root {
          --sand: #F1E6C8; --sand-deep: #E8D9AE; --gulf: #14424F; --gulf-deep: #0D3038;
          --citrus: #E2872A; --palmetto: #2E5339; --coral: #B5453F; --sunshine: #D9A62E;
          --ink: #16211F; --slate: #5C6864; --line: #CBB98A;
          background: var(--sand);
          background-image: radial-gradient(circle at 1px 1px, rgba(20,66,79,0.06) 1px, transparent 0);
          background-size: 16px 16px;
          color: var(--ink);
          font-family: 'Avenir Next', 'Century Gothic', Futura, 'Segoe UI', sans-serif;
          min-height: 100%; padding: 30px 20px 60px; box-sizing: border-box;
        }
        .fsc-root * { box-sizing: border-box; }
        .fsc-display { font-family: 'Big Caslon', Didot, Georgia, 'Times New Roman', serif; }
        .fsc-wrap { max-width: 1180px; margin-left: auto; margin-right: auto; }

        .fsc-header { border-bottom: 2px solid var(--gulf); padding-bottom: 18px; display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; flex-wrap: wrap; margin-bottom: 8px; }
        .fsc-title-block { display: flex; gap: 16px; align-items: flex-start; }
        .fsc-eyebrow { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--citrus); margin: 4px 0 6px; font-weight: 600; }
        .fsc-h1 { font-size: 32px; line-height: 1.05; margin: 0; font-weight: 700; color: var(--gulf-deep); }
        .fsc-motto { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--slate); margin-top: 8px; font-style: italic; }
        .fsc-search { font-size: 13px; padding: 11px 14px; border: 1.5px solid var(--gulf); background: #FBF6E7; color: var(--ink); min-width: 240px; outline: none; height: fit-content; border-radius: 2px; }
        .fsc-search::placeholder { color: var(--slate); }
        .fsc-search:focus { border-color: var(--citrus); }
        .fsc-divider { display: block; width: 140px; height: 18px; margin: 18px auto; opacity: 0.85; }

        .fsc-finding { border: 2px solid var(--gulf); background: #FBF6E7; padding: 22px 24px; margin-bottom: 22px; }
        .fsc-finding-eyebrow { font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--citrus); font-weight: 700; margin-bottom: 8px; }
        .fsc-finding-head { font-size: 24px; line-height: 1.15; font-weight: 700; color: var(--gulf-deep); margin: 0 0 10px; max-width: 780px; }
        .fsc-finding-body { font-size: 13.5px; line-height: 1.65; max-width: 820px; margin: 0 0 6px; }
        .fsc-clockrow { display: flex; gap: 28px; flex-wrap: wrap; margin: 16px 0 6px; }
        .fsc-clock { border-left: 3px solid var(--coral); padding-left: 12px; }
        .fsc-clock.slow { border-left-color: var(--gulf); }
        .fsc-clock-val { font-size: 27px; font-weight: 700; color: var(--gulf-deep); line-height: 1; }
        .fsc-clock-lbl { font-size: 11px; color: var(--slate); margin-top: 5px; line-height: 1.4; max-width: 210px; }
        .fsc-strip { width: 100%; height: auto; margin-top: 10px; display: block; }
        .fsc-strip-dot { cursor: pointer; }
        .fsc-strip-dot:hover { fill-opacity: 1; }
        .fsc-strip-tick { font-size: 11px; fill: var(--slate); font-family: 'Courier New', monospace; }
        .fsc-caption { font-size: 11px; color: var(--slate); line-height: 1.5; margin-top: 4px; }

        .fsc-section-toggle { display: flex; justify-content: flex-end; gap: 16px; margin-bottom: 8px; }
        .fsc-link-btn { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; background: none; border: none; color: var(--gulf); cursor: pointer; text-decoration: underline; text-underline-offset: 3px; padding: 4px 0; font-weight: 600; }
        .fsc-link-btn:hover { color: var(--citrus); }

        .fsc-panels { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 22px; }
        @media (max-width: 820px) { .fsc-panels { grid-template-columns: 1fr; } }
        .fsc-panel { border: 1.4px solid var(--line); background: #FBF6E7; padding: 16px 18px; }
        .fsc-panel-title { font-size: 10.5px; color: var(--slate); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; font-weight: 700; }
        .fsc-panel-sub { font-size: 11.5px; color: var(--slate); line-height: 1.5; margin-bottom: 12px; }

        .fsc-velocity { display: flex; flex-direction: column; gap: 8px; }
        .fsc-vel-row { display: grid; grid-template-columns: 10px 1fr 34px 90px 42px; gap: 8px; align-items: center; font-size: 11.5px; }
        .fsc-vel-dot { width: 9px; height: 9px; border-radius: 50%; }
        .fsc-vel-label { line-height: 1.3; }
        .fsc-vel-n { color: var(--slate); font-size: 10px; font-family: 'Courier New', monospace; }
        .fsc-vel-bar-wrap { background: rgba(20,66,79,0.09); height: 8px; }
        .fsc-vel-bar { display: block; height: 8px; opacity: 0.85; }
        .fsc-vel-val { text-align: right; font-weight: 700; font-family: 'Courier New', monospace; font-size: 11px; }

        .fsc-repl-head, .fsc-repl-row { display: grid; grid-template-columns: 52px 1fr 1fr 46px; gap: 8px; align-items: center; }
        .fsc-repl-head { font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--slate); font-weight: 700; padding-bottom: 6px; border-bottom: 1px solid var(--line); margin-bottom: 6px; }
        .fsc-repl-head span:last-child, .fsc-repl-row .fsc-repl-gap { text-align: right; }
        .fsc-repl-row { padding: 7px 0; border-bottom: 1px solid rgba(203,185,138,0.4); font-size: 12px; }
        .fsc-repl-term { font-family: 'Courier New', monospace; color: var(--slate); font-weight: 700; }
        .fsc-repl-val { font-weight: 700; font-family: 'Courier New', monospace; color: var(--gulf-deep); }
        .fsc-repl-val em { font-style: normal; font-weight: 400; color: var(--slate); font-size: 10px; margin-left: 5px; }
        .fsc-repl-gap { font-weight: 700; color: var(--citrus); font-family: 'Courier New', monospace; }

        .fsc-cov-row { display: flex; gap: 9px; padding: 9px 0; border-bottom: 1px solid rgba(203,185,138,0.4); }
        .fsc-cov-row:last-child { border-bottom: none; }
        .fsc-cov-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
        .fsc-cov-dot.live { background: var(--palmetto); }
        .fsc-cov-dot.ready { background: var(--citrus); }
        .fsc-cov-dot.unverified { background: var(--line); }
        .fsc-cov-body { display: flex; flex-direction: column; gap: 2px; font-size: 11.5px; line-height: 1.45; }
        .fsc-cov-body em { font-style: normal; font-family: 'Courier New', monospace; font-size: 10px; color: var(--slate); }
        .fsc-cov-body span { color: var(--ink); opacity: 0.85; }

        .fsc-tab.term { border-color: var(--palmetto); color: var(--palmetto); }
        .fsc-tab.term.active { background: var(--palmetto); color: #FBF6E7; border-color: var(--palmetto); }
        .fsc-archive-note { font-size: 12.5px; line-height: 1.55; color: var(--slate); font-style: italic; margin-bottom: 16px; }

        .fsc-cohort { display: flex; flex-direction: column; gap: 8px; }
        .fsc-cohort-row { display: grid; grid-template-columns: 42px 1fr 28px; gap: 10px; align-items: center; font-size: 11.5px; }
        .fsc-cohort-year { font-family: 'Courier New', monospace; color: var(--slate); }
        .fsc-cohort-bar-wrap { background: rgba(20,66,79,0.09); height: 10px; }
        .fsc-cohort-bar { display: block; height: 10px; background: var(--palmetto); opacity: 0.85; }
        .fsc-cohort-count { text-align: right; font-weight: 700; font-family: 'Courier New', monospace; }

        .fsc-bench-title { font-size: 20px; font-weight: 700; color: var(--gulf-deep); margin-bottom: 4px; }
        .fsc-bench-sub { font-size: 13px; color: var(--slate); margin-bottom: 14px; max-width: 760px; line-height: 1.5; }
        .fsc-bench-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; margin-bottom: 22px; }
        .fsc-justice-card { text-align: left; background: #FBF6E7; border: 1.4px solid var(--line); padding: 14px; cursor: pointer; transition: border-color 0.15s ease, transform 0.15s ease; }
        .fsc-justice-card:hover { border-color: var(--citrus); transform: translateY(-2px); }
        .fsc-justice-initial { width: 34px; height: 34px; border-radius: 50%; background: var(--gulf); color: var(--sand); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; margin-bottom: 8px; }
        .fsc-justice-name { font-size: 14px; font-weight: 700; line-height: 1.25; }
        .fsc-justice-title { font-size: 11px; color: var(--citrus); font-weight: 600; margin-top: 2px; }
        .fsc-justice-since { font-size: 10.5px; color: var(--slate); margin-top: 6px; }

        .fsc-about { border: 1.4px solid var(--line); background: #FBF6E7; padding: 20px 22px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 22px; }
        .fsc-about h3 { font-size: 16px; margin: 0 0 8px; color: var(--gulf-deep); }
        .fsc-about p { font-size: 13px; line-height: 1.6; margin: 0 0 10px; }
        .fsc-about ul { margin: 0 0 10px; padding-left: 18px; font-size: 13px; line-height: 1.6; }
        .fsc-cat-legend-row { display: flex; gap: 8px; font-size: 12.5px; line-height: 1.55; margin-bottom: 7px; }
        .fsc-cat-legend-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }
        @media (max-width: 820px) { .fsc-about { grid-template-columns: 1fr; } }

        .fsc-outlook { border: 1.4px solid var(--gulf); background: rgba(20,66,79,0.05); padding: 18px 22px; margin-bottom: 22px; }
        .fsc-outlook-title { font-size: 16px; font-weight: 700; color: var(--gulf-deep); margin-bottom: 6px; }
        .fsc-outlook-disclaimer { font-size: 12px; color: var(--slate); font-style: italic; margin-bottom: 12px; line-height: 1.5; }
        .fsc-outlook p { font-size: 13.5px; line-height: 1.6; margin: 0 0 10px; }

        .fsc-spotlight { border: 1.6px dashed var(--coral); background: rgba(181,69,63,0.06); padding: 16px 18px; margin-bottom: 22px; }
        .fsc-spotlight-title { font-size: 10.5px; color: var(--coral); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; font-weight: 700; }
        .fsc-spotlight-name { font-size: 16px; font-weight: 700; margin-bottom: 4px; }
        .fsc-spotlight-note { font-size: 13px; line-height: 1.55; margin-bottom: 10px; }
        .fsc-spotlight-dockets { display: flex; flex-wrap: wrap; gap: 8px; }
        .fsc-spotlight-chip { font-size: 10.5px; border: 1px solid var(--coral); color: var(--coral); padding: 5px 9px; cursor: pointer; background: #FBF6E7; font-family: 'Courier New', monospace; }
        .fsc-spotlight-chip:hover { background: var(--coral); color: #FBF6E7; }

        .fsc-stats { display: grid; grid-template-columns: minmax(190px, 270px) 1fr; gap: 16px; margin-bottom: 22px; }
        @media (max-width: 820px) { .fsc-stats { grid-template-columns: 1fr; } }
        .fsc-stat-card { border: 1.4px solid var(--line); background: #FBF6E7; padding: 16px; }
        .fsc-stat-num { font-size: 36px; font-weight: 700; line-height: 1; color: var(--gulf-deep); }
        .fsc-stat-label { font-size: 10.5px; color: var(--slate); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 6px; font-weight: 600; }
        .fsc-stat-note { font-size: 10.5px; color: var(--slate); line-height: 1.45; margin-top: 7px; }
        .fsc-stat-breakdown { margin-top: 14px; display: flex; flex-direction: column; gap: 5px; }
        .fsc-stat-row { display: flex; align-items: center; gap: 8px; font-size: 11.5px; }
        .fsc-stat-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
        .fsc-stat-row-label { flex: 1; }
        .fsc-stat-row-count { color: var(--slate); font-weight: 600; }

        .fsc-chart-card { border: 1.4px solid var(--line); background: #FBF6E7; padding: 16px; }
        .fsc-chart-title { font-size: 10.5px; color: var(--slate); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px; font-weight: 600; }
        .fsc-chart { display: flex; align-items: flex-end; gap: 10px; height: 110px; }
        .fsc-chart-col { display: flex; flex-direction: column; align-items: center; flex: 1; height: 100%; }
        .fsc-chart-bar-wrap { flex: 1; display: flex; align-items: flex-end; width: 100%; }
        .fsc-chart-bar { width: 100%; background: var(--citrus); opacity: 0.85; min-height: 2px; }
        .fsc-chart-count { font-size: 10px; margin-top: 4px; font-weight: 600; }
        .fsc-chart-label { font-size: 9.5px; color: var(--slate); margin-top: 2px; }
        .fsc-chart-note { font-size: 9.5px; color: var(--slate); margin-top: 10px; }

        .fsc-controls { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 14px; }
        .fsc-tabs { display: flex; flex-wrap: wrap; gap: 8px; }
        .fsc-tab { font-size: 11px; letter-spacing: 0.03em; text-transform: uppercase; padding: 7px 11px; border: 1.4px solid var(--line); background: transparent; color: var(--slate); cursor: pointer; font-weight: 600; }
        .fsc-tab:hover { border-color: var(--gulf); color: var(--gulf); }
        .fsc-tab.active { background: var(--gulf); color: var(--sand); border-color: var(--gulf); }
        .fsc-tab.watch { border-color: var(--citrus); color: var(--citrus); }
        .fsc-tab.watch.active { background: var(--citrus); color: #FBF6E7; border-color: var(--citrus); }
        .fsc-right-controls { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
        .fsc-sort, .fsc-viewbtn, .fsc-export { font-size: 11px; text-transform: uppercase; letter-spacing: 0.03em; background: none; border: 1.4px solid var(--line); padding: 7px 11px; color: var(--slate); cursor: pointer; font-weight: 600; }
        .fsc-sort:hover, .fsc-viewbtn:hover, .fsc-export:hover { border-color: var(--gulf); color: var(--gulf); }
        .fsc-viewbtn.active, .fsc-sort.active { background: var(--gulf); color: var(--sand); border-color: var(--gulf); }

        .fsc-count { font-size: 11.5px; color: var(--slate); margin-bottom: 10px; }

        .fsc-list { border-top: 2px solid var(--gulf); }
        .fsc-row { display: grid; grid-template-columns: 26px 150px 88px 1fr 62px 150px; gap: 12px; align-items: center; padding: 12px 6px; border-bottom: 1px solid var(--line); cursor: pointer; }
        .fsc-row:hover { background: rgba(226,135,42,0.08); }
        .fsc-row:focus-visible { outline: 2px solid var(--citrus); outline-offset: -2px; }
        .fsc-star { background: none; border: none; cursor: pointer; font-size: 15px; line-height: 1; color: var(--line); padding: 2px; }
        .fsc-star.on { color: var(--citrus); }
        .fsc-star:hover { color: var(--citrus); }
        .fsc-row-docket, .fsc-row-date { font-family: 'Courier New', monospace; font-size: 10.5px; color: var(--slate); }
        .fsc-row-title { font-size: 14.5px; font-weight: 700; line-height: 1.3; }
        .fsc-row-lag { font-family: 'Courier New', monospace; font-size: 11px; font-weight: 700; text-align: right; color: var(--gulf-deep); }
        .fsc-row-cat { font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.03em; text-align: right; font-weight: 700; }
        @media (max-width: 860px) { .fsc-row { grid-template-columns: 26px 1fr; gap: 4px; } .fsc-row-cat, .fsc-row-lag { text-align: left; } }

        .fsc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
        .fsc-card { position: relative; background: #FBF6E7; border: 1.4px solid var(--line); padding: 16px 16px 44px; cursor: pointer; transition: border-color 0.15s ease, transform 0.15s ease; overflow: hidden; min-height: 168px; }
        .fsc-card:hover { border-color: var(--citrus); transform: translateY(-1px); }
        .fsc-card-title { font-size: 16px; font-weight: 700; margin: 6px 0 8px; line-height: 1.25; }
        .fsc-card-cat { font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; font-weight: 700; }
        .fsc-card-summary { font-size: 12.5px; line-height: 1.5; opacity: 0.85; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .fsc-card-date { position: absolute; bottom: 14px; left: 16px; font-family: 'Courier New', monospace; font-size: 10.5px; color: var(--slate); }
        .stamp { position: absolute; bottom: 6px; right: 8px; width: 76px; height: 76px; opacity: 0.6; mix-blend-mode: multiply; display: flex; align-items: center; justify-content: center; pointer-events: none; }
        .stamp-status { position: absolute; font-size: 7px; text-transform: uppercase; line-height: 1.1; text-align: center; padding: 0 14px; font-weight: 700; }

        .fsc-empty { margin: 40px auto; text-align: center; color: var(--slate); font-size: 13px; }

        .fsc-overlay { position: fixed; inset: 0; background: rgba(13,48,56,0.6); display: flex; align-items: center; justify-content: center; padding: 24px; z-index: 50; }
        .fsc-modal { background: var(--sand); border: 2px solid var(--gulf); max-width: 560px; width: 100%; padding: 26px 26px 22px; position: relative; max-height: 85vh; overflow-y: auto; }
        .fsc-modal-close { position: absolute; top: 14px; right: 16px; background: none; border: none; font-size: 13px; color: var(--slate); cursor: pointer; font-weight: 600; }
        .fsc-modal-close:hover { color: var(--gulf); }
        .fsc-modal-docket { font-family: 'Courier New', monospace; font-size: 11px; color: var(--citrus); letter-spacing: 0.04em; font-weight: 700; }
        .fsc-modal-title { font-size: 22px; font-weight: 700; margin: 8px 0 4px; line-height: 1.25; color: var(--gulf-deep); }
        .fsc-modal-meta { font-size: 11px; color: var(--slate); margin-bottom: 14px; }
        .fsc-modal-summary { font-size: 14.5px; line-height: 1.6; margin-bottom: 16px; }
        .fsc-modal-links a { font-size: 11.5px; color: var(--gulf); text-decoration: underline; text-underline-offset: 3px; display: block; margin-bottom: 6px; font-weight: 600; }
        .fsc-modal-links a:hover { color: var(--citrus); }
        .fsc-modal-section-label { font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--gulf); font-weight: 700; margin: 14px 0 4px; }
        .fsc-lagbox { border: 1.4px solid var(--line); background: #FBF6E7; padding: 12px 14px; margin-bottom: 16px; display: flex; gap: 22px; flex-wrap: wrap; }
        .fsc-lagbox-item { font-size: 11px; color: var(--slate); }
        .fsc-lagbox-val { display: block; font-size: 17px; font-weight: 700; color: var(--gulf-deep); font-family: 'Courier New', monospace; }
        .fsc-note-area { width: 100%; min-height: 70px; border: 1.4px solid var(--line); background: #FBF6E7; padding: 10px; font-family: inherit; font-size: 13px; color: var(--ink); resize: vertical; outline: none; }
        .fsc-note-area:focus { border-color: var(--citrus); }
        .fsc-watch-btn { border: 1.4px solid var(--citrus); background: none; color: var(--citrus); padding: 8px 14px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; font-weight: 700; cursor: pointer; margin-bottom: 14px; }
        .fsc-watch-btn.on { background: var(--citrus); color: #FBF6E7; }

        .fsc-footer { border-top: 1.4px solid var(--line); padding-top: 16px; font-size: 11px; color: var(--slate); line-height: 1.6; margin-top: 40px; }
        .fsc-footer a { color: var(--gulf); font-weight: 600; }
        .fsc-footer a:hover { color: var(--citrus); }
        .fsc-method { margin-top: 10px; font-size: 10.5px; line-height: 1.6; }
      `}</style>

      <div className="fsc-wrap">
        <div className="fsc-header">
          <div className="fsc-title-block">
            <ThemisMark />
            <div>
              <div className="fsc-eyebrow">Supreme Court of Florida · 2026 Term</div>
              <h1 className="fsc-h1 fsc-display">The Case Register</h1>
              <div className="fsc-motto">Sat Cito Si Recte — soon enough, if done rightly</div>
            </div>
          </div>
          <input className="fsc-search" placeholder="Search by case name or docket no." value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search cases" />
        </div>

        <PalmDivider />

        <div className="fsc-finding">
          <div className="fsc-finding-eyebrow">Finding · derived from docket records</div>
          <h2 className="fsc-finding-head fsc-display">
            This Court decides capital cases on two different clocks — and the gap between them is {clocks.ratio ? clocks.ratio.toFixed(1) : "—"}×.
          </h2>
          <p className="fsc-finding-body">
            Every docket number encodes the year a matter was filed. Set that against the decision date and each
            case yields a disposition lag. Sorted that way, the capital docket splits cleanly in two: matters
            filed and resolved inside the same year — the emergency posture that follows a signed death warrant —
            and everything else, moving at ordinary appellate speed.
          </p>
          <div className="fsc-clockrow">
            <div className="fsc-clock">
              <div className="fsc-clock-val">{clocks.expeditedMedian}d</div>
              <div className="fsc-clock-lbl">median for the {clocks.expedited.length} capital matters filed and decided within 2026</div>
            </div>
            <div className="fsc-clock slow">
              <div className="fsc-clock-val">{clocks.ordinaryMedian}d</div>
              <div className="fsc-clock-lbl">median for the {clocks.ordinary.length} capital matters carried over from earlier filing years</div>
            </div>
            <div className="fsc-clock slow">
              <div className="fsc-clock-val">{cohorts[0] ? cohorts[0].year : "—"}</div>
              <div className="fsc-clock-lbl">oldest filing year still being resolved on this term's docket</div>
            </div>
          </div>
          <DispositionStrip cases={enriched} onSelect={setSelected} />
          <div className="fsc-caption">
            Each dot is one matter, placed by time from filing year to decision and colored by category. Click any dot to open the case.
            Lag is measured from January 1 of the filing year, since docket numbers encode the year but not the exact filing date —
            a consistent comparator across cases rather than a precise pendency clock.
          </div>
        </div>

        <div className="fsc-panels">
          <div className="fsc-panel">
            <div className="fsc-panel-title">Does the split replicate?</div>
            <div className="fsc-panel-sub">
              The two-clock finding recomputed independently for each term. 2025 categories were assigned by
              the classifier, not by hand, so that term is a held-out check rather than a restatement.
            </div>
            <div className="fsc-repl-head">
              <span>Term</span><span>Expedited</span><span>Ordinary</span><span>Gap</span>
            </div>
            {replication.map((r) => (
              <div className="fsc-repl-row" key={r.term}>
                <span className="fsc-repl-term">{r.term}</span>
                <span className="fsc-repl-val">{r.expeditedMedian}d<em>n={r.expedited.length}</em></span>
                <span className="fsc-repl-val">{r.ordinaryMedian}d<em>n={r.ordinary.length}</em></span>
                <span className="fsc-repl-gap">{r.ratio ? r.ratio.toFixed(1) + "\u00d7" : "—"}</span>
              </div>
            ))}
            <div className="fsc-panel-sub" style={{ marginTop: 10, marginBottom: 0 }}>
              The ordinary-track medians sit within a few percent of one another across terms. The expedited
              track is faster in both, by a wide margin in both.
            </div>
          </div>
          <div className="fsc-panel">
            <div className="fsc-panel-title">Coverage &amp; how it extends</div>
            <div className="fsc-panel-sub">
              The method depends only on courts encoding a filing year in the docket number. Each court needs a
              small format adapter, not a separate pipeline.
            </div>
            {COVERAGE.map((c) => (
              <div className="fsc-cov-row" key={c.court}>
                <span className={`fsc-cov-dot ${c.status}`} />
                <span className="fsc-cov-body">
                  <strong>{c.court}</strong>
                  <em>{c.format}</em>
                  <span>{c.note}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="fsc-panels">
          <div className="fsc-panel">
            <div className="fsc-panel-title">Median time to disposition, by category</div>
            <div className="fsc-panel-sub">Rulemaking moves fastest. Civil disputes and bar discipline sit at the slow end.</div>
            <VelocityTable rows={velocity} />
          </div>
          <div className="fsc-panel">
            <div className="fsc-panel-title">Filing-year cohorts cleared in 2026</div>
            <div className="fsc-panel-sub">How far back the Court is still reaching. Older cohorts are the tail of the backlog.</div>
            <CohortChart rows={cohorts} />
          </div>
        </div>

        <div className="fsc-bench-title fsc-display">The Bench</div>
        <div className="fsc-bench-sub">Seven justices sit on Florida's highest court. Select a name for background, judicial approach, and what to watch for in cases like the ones on this docket.</div>
        <div className="fsc-bench-grid">
          {JUSTICES.map((j) => <JusticeCard key={j.id} justice={j} onOpen={setSelectedJustice} />)}
        </div>

        <div className="fsc-section-toggle">
          <button className="fsc-link-btn" onClick={() => setAboutOpen(!aboutOpen)}>{aboutOpen ? "Hide" : "Show"} how this Court works</button>
          <button className="fsc-link-btn" onClick={() => setOutlookOpen(!outlookOpen)}>{outlookOpen ? "Hide" : "Show"} docket outlook</button>
        </div>

        {aboutOpen && (
          <div className="fsc-about">
            <div>
              <h3>How Cases Reach This Court</h3>
              <p>Most Florida appeals go to a District Court of Appeal, not here. The Supreme Court hears a case directly only in circumstances set out in Article V, Section 3 of the Florida Constitution:</p>
              <ul>
                <li><strong>Mandatory jurisdiction:</strong> death-penalty appeals and public utility rate cases come straight here — why capital matters dominate the docket.</li>
                <li><strong>Discretionary jurisdiction:</strong> state constitutional questions, certified conflicts between appellate courts, and questions certified as being of great public importance.</li>
                <li><strong>Original writs:</strong> habeas corpus, mandamus, prohibition, and quo warranto.</li>
              </ul>
              <div>
                {Object.keys(CATEGORY_STYLE).map((cat) => (
                  <div className="fsc-cat-legend-row" key={cat}>
                    <span className="fsc-cat-legend-dot" style={{ background: CATEGORY_STYLE[cat] }} />
                    <span><strong>{cat}:</strong> {CATEGORY_DESCRIPTIONS[cat]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3>How Justices Are Chosen</h3>
              <p>Seven justices serve six-year terms. A nine-member Judicial Nominating Commission — all appointed by the Governor, four from Bar-nominated lists — sends three to six names for each vacancy, and the Governor appoints from that list.</p>
              <p>A newly appointed justice then faces a retention vote at the first general election held at least a year after the appointment, rather than running against other candidates.</p>
              <p>Justices can be removed only by impeachment (a two-thirds House vote followed by a two-thirds Senate conviction), or by the Court itself acting on a recommendation from the Judicial Qualifications Commission, which can also recommend lesser discipline.</p>
            </div>
          </div>
        )}

        {outlookOpen && (
          <div className="fsc-outlook">
            <div className="fsc-outlook-title fsc-display">Docket Outlook</div>
            <div className="fsc-outlook-disclaimer">
              Analysis, not a forecast of any actual ruling. This reasons from each justice's public record and documented
              judicial philosophy toward how similar matters have tended to be approached. It is not a claim about how any
              justice will vote on any specific case.
            </div>
            <p>
              Six of the Court's seven current members were appointed by Governor Ron DeSantis, and nearly all describe
              themselves as textualists or originalists — reading statutes and the constitution by their plain, original terms
              rather than by inferred purpose. Close cases are therefore more likely to turn on precise statutory or procedural
              arguments than on broad constitutional balancing, and petitioners raising novel constitutional theories face a
              higher bar than those pointing to a specific textual or procedural error.
            </p>
            <p>
              Justice Labarga, the only member not appointed by Gov. DeSantis, is the bench's most independent vote by
              composition — though he rarely dissents publicly and must retire at the mandatory age of 75 in October 2028.
            </p>
            <p>
              The timing data above sharpens one practical expectation: once a death warrant issues, the surrounding
              litigation resolves in a matter of weeks, not years. Any newly warranted case should be expected to move on
              that compressed schedule rather than the multi-year track that governs ordinary appeals.
            </p>
          </div>
        )}

        {recurring.map((group) => (
          <div className="fsc-spotlight" key={group.key}>
            <div className="fsc-spotlight-title">Case Spotlight — Recurring Docket</div>
            <div className="fsc-spotlight-name">{group.cases[0].title.split(/ v\. /i)[0]} ({group.cases.length} separate matters in 2026)</div>
            <div className="fsc-spotlight-note">
              This litigant's case has reached the Court {group.cases.length} separate times this year. A single capital
              conviction can generate a direct appeal, successive postconviction motions, DNA-access requests, and
              warrant-related stays, each with its own docket number — the clearest illustration of why case-level counts
              understate how much of the Court's attention one matter can consume.
            </div>
            <div className="fsc-spotlight-dockets">
              {group.cases.map((c) => (
                <button key={c.uid} className="fsc-spotlight-chip" onClick={() => setSelected(c)}>
                  {formatDate(c.date)} · {c.docket} · {formatLag(c.days)}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="fsc-stats">
          <div className="fsc-stat-card">
            <div className="fsc-stat-num">{enriched.length}</div>
            <div className="fsc-stat-label">{term === "all" ? "Opinions, both terms" : `Opinions, ${term} term`}</div>
            {distinctDockets !== enriched.length && (
              <div className="fsc-stat-note">
                across {distinctDockets} distinct dockets — {enriched.length - distinctDockets} matter
                {enriched.length - distinctDockets === 1 ? "" : "s"} drew a second opinion on rehearing.
              </div>
            )}
            <div className="fsc-stat-breakdown">
              {Object.keys(CATEGORY_STYLE).map((cat) => (
                <div className="fsc-stat-row" key={cat}>
                  <span className="fsc-stat-dot" style={{ background: CATEGORY_STYLE[cat] }} />
                  <span className="fsc-stat-row-label">{cat}</span>
                  <span className="fsc-stat-row-count">{categoryCounts[cat] || 0}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="fsc-chart-card">
            <div className="fsc-chart-title">Matters by month{term === "all" ? ", all terms combined" : `, ${term}`}</div>
            <MiniBarChart data={monthly} />
            <div className="fsc-chart-note">The 2026 term is partial, running through July 24.</div>
          </div>
        </div>

        <div className="fsc-controls">
          <div className="fsc-tabs">
            {CATEGORIES.map((c) => (
              <button key={c} className={`fsc-tab ${category === c ? "active" : ""}`} onClick={() => setCategory(c)}>{c}</button>
            ))}
            {TERMS.map((t) => (
              <button key={String(t)} className={`fsc-tab term ${term === t ? "active" : ""}`} onClick={() => setTerm(t)}>
                {t === "all" ? "Both terms" : `${t} term`}
              </button>
            ))}
            <button className={`fsc-tab watch ${watchOnly ? "active" : ""}`} onClick={() => setWatchOnly(!watchOnly)}>
              ★ Watchlist ({watchlist.length})
            </button>
          </div>
          <div className="fsc-right-controls">
            <button className="fsc-export" onClick={() => downloadBlob(toCSV(filtered), "fl-supreme-court-cases.csv", "text/csv")}>Export CSV</button>
            <button className="fsc-export" onClick={() => downloadBlob(JSON.stringify(filtered, null, 2), "fl-supreme-court-cases.json", "application/json")}>Export JSON</button>
            <button className={`fsc-viewbtn ${view === "list" ? "active" : ""}`} onClick={() => setView("list")}>List</button>
            <button className={`fsc-viewbtn ${view === "grid" ? "active" : ""}`} onClick={() => setView("grid")}>Grid</button>
            <button className={`fsc-sort ${sortKey === "date" ? "active" : ""}`} onClick={() => cycleSort("date")}>Date {sortKey === "date" ? (sortDir === "desc" ? "↓" : "↑") : ""}</button>
            <button className={`fsc-sort ${sortKey === "lag" ? "active" : ""}`} onClick={() => cycleSort("lag")}>Time to decide {sortKey === "lag" ? (sortDir === "desc" ? "↓" : "↑") : ""}</button>
          </div>
        </div>

        <div className="fsc-count">
          {filtered.length} {filtered.length === 1 ? "matter" : "matters"} shown
          {watchOnly ? " · watchlist only" : ""}
        </div>

        {filtered.length === 0 ? (
          <div className="fsc-empty">
            {watchOnly ? "Nothing on your watchlist yet. Star a matter to follow it." : "No matters match that search. Try a different docket number or term."}
          </div>
        ) : view === "list" ? (
          <div className="fsc-list">
            {filtered.map((c) => (
              <div key={c.uid} className="fsc-row" tabIndex={0} role="button" onClick={() => setSelected(c)} onKeyDown={(e) => (e.key === "Enter" ? setSelected(c) : null)}>
                <button className={`fsc-star ${watchlist.includes(c.docket) ? "on" : ""}`}
                  aria-label={watchlist.includes(c.docket) ? "Remove from watchlist" : "Add to watchlist"}
                  onClick={(e) => { e.stopPropagation(); toggleWatch(c.docket); }}>
                  {watchlist.includes(c.docket) ? "★" : "☆"}
                </button>
                <div className="fsc-row-docket">{c.docket}</div>
                <div className="fsc-row-date">{formatDate(c.date)}</div>
                <div className="fsc-row-title">{c.title}</div>
                <div className="fsc-row-lag" title="Time from filing year to decision">{formatLag(c.days)}</div>
                <div className="fsc-row-cat" style={{ color: CATEGORY_STYLE[c.category] }}>{c.category}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="fsc-grid">
            {filtered.map((c, i) => (
              <div key={c.uid} className="fsc-card" tabIndex={0} role="button" onClick={() => setSelected(c)} onKeyDown={(e) => (e.key === "Enter" ? setSelected(c) : null)}>
                <div className="fsc-row-docket">{c.docket} · {formatLag(c.days)}</div>
                <div className="fsc-card-title">{c.title}</div>
                <div className="fsc-card-cat" style={{ color: CATEGORY_STYLE[c.category] }}>{c.category}</div>
                <div className="fsc-card-summary">{c.summary || "Archived matter — caption, docket, and timing only."}</div>
                <div className="fsc-card-date">{formatDate(c.date)}</div>
                <CitrusStamp category={c.category} rotate={(i % 5) * 3 - 6} />
              </div>
            ))}
          </div>
        )}

        <div className="fsc-footer">
          Current bench: Chief Justice John D. Couriel, and Justices Carlos G. Muñiz, Jorge Labarga, Renatha Francis,
          Jamie R. Grosshans, Meredith Sasso, and Adam Tanenbaum. An independent, unofficial reference, not affiliated
          with the Florida Supreme Court. Case summaries are condensed for readability — consult the official opinion
          for controlling text.
          <div className="fsc-method">
            <strong>Method.</strong> The 2026 term is hand-reviewed and carries summaries. The 2025 term is
            ingested at scale: captions and dockets are transcribed from the published index, and categories are
            assigned by a rule-based classifier that reproduces the hand labels on the 2026 term exactly, with
            ambiguous captions flagged for review rather than guessed. Disposition lag is computed from the
            filing year encoded in each docket number
            (SC2024-0380 = filed 2024) against the decision date, measured from January 1 of that year. Because docket
            numbers carry the year but not the exact filing date, lag is a consistent comparator across matters rather
            than a precise pendency figure, and it understates true pendency for cases filed late in a year. Watchlists
            and notes are stored on this device.
          </div>
          <div style={{ marginTop: 8 }}>
            <a href="https://acis.flcourts.gov" target="_blank" rel="noreferrer">acis.flcourts.gov — official docket lookup ↗</a><br />
            <a href="https://supremecourt.flcourts.gov/case-information" target="_blank" rel="noreferrer">supremecourt.flcourts.gov — case information ↗</a><br />
            <a href="https://law.justia.com/cases/florida/supreme-court/2026/" target="_blank" rel="noreferrer">law.justia.com — full 2026 opinion archive ↗</a>
          </div>
        </div>
      </div>

      {selected && (
        <div className="fsc-overlay" onClick={() => setSelected(null)}>
          <div className="fsc-modal" onClick={(e) => e.stopPropagation()}>
            <button className="fsc-modal-close" onClick={() => setSelected(null)} aria-label="Close">CLOSE ✕</button>
            <div className="fsc-modal-docket">{selected.docket}</div>
            <div className="fsc-modal-title fsc-display">{selected.title}</div>
            <div className="fsc-modal-meta">{selected.category} · decided {formatDate(selected.date)}</div>
            <div className="fsc-lagbox">
              <div className="fsc-lagbox-item"><span className="fsc-lagbox-val">{selected.filingYear ?? "—"}</span>filing year</div>
              <div className="fsc-lagbox-item"><span className="fsc-lagbox-val">{formatLag(selected.days)}</span>to disposition</div>
              <div className="fsc-lagbox-item"><span className="fsc-lagbox-val">{selected.sameYear ? "Expedited" : "Ordinary"}</span>track</div>
            </div>
            <button className={`fsc-watch-btn ${watchlist.includes(selected.docket) ? "on" : ""}`} onClick={() => toggleWatch(selected.docket)}>
              {watchlist.includes(selected.docket) ? "★ On your watchlist" : "☆ Add to watchlist"}
            </button>
            {selected.summary
              ? <div className="fsc-modal-summary">{selected.summary}</div>
              : <div className="fsc-archive-note">Archived matter — caption, docket, and timing only. Open the term archive below for the full opinion.</div>}
            <div className="fsc-modal-section-label">Your notes</div>
            <textarea className="fsc-note-area" placeholder="Add a note about this matter — saved on this device."
              value={notes[selected.docket] || ""} onChange={(e) => setNote(selected.docket, e.target.value)} />
            <div className="fsc-modal-section-label">Sources</div>
            <div className="fsc-modal-links">
              <a href={selected.url} target="_blank" rel="noreferrer">Read the case listing on Justia ↗</a>
              <a href="https://acis.flcourts.gov" target="_blank" rel="noreferrer">Look up on the official docket (ACIS) ↗</a>
            </div>
          </div>
        </div>
      )}

      {selectedJustice && (
        <div className="fsc-overlay" onClick={() => setSelectedJustice(null)}>
          <div className="fsc-modal" onClick={(e) => e.stopPropagation()}>
            <button className="fsc-modal-close" onClick={() => setSelectedJustice(null)} aria-label="Close">CLOSE ✕</button>
            <div className="fsc-modal-docket">{selectedJustice.title}</div>
            <div className="fsc-modal-title fsc-display">{selectedJustice.name}</div>
            <div className="fsc-modal-meta">{selectedJustice.since}</div>
            <div className="fsc-modal-section-label">Appointment</div>
            <div className="fsc-modal-summary">{selectedJustice.appointedBy}</div>
            <div className="fsc-modal-section-label">Background</div>
            <div className="fsc-modal-summary">{selectedJustice.background}</div>
            <div className="fsc-modal-section-label">Judicial Philosophy</div>
            <div className="fsc-modal-summary">{selectedJustice.philosophy}</div>
            <div className="fsc-modal-section-label">What to Watch For</div>
            <div className="fsc-modal-summary">{selectedJustice.outlook}</div>
          </div>
        </div>
      )}
    </div>
  );
}
