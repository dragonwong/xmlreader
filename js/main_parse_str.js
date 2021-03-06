	
	//早期版本
	//同步加载
	

	//create xml parser
	var parseXml = function(xmlStr) {
        return (new window.DOMParser()).parseFromString(xmlStr, "text/xml");
    };

    /*var xml_str = '<?xml version="1.0" encoding="utf-8"?><lv1 data1="a" data2="b"><lv2><lv3 data="1-lv3">first lv3</lv3><lv3 data="2-lv3">seconde lv3</lv3></lv2><lv2><lv3><![CDATA[This is the first version of ENLS]]></lv3></lv2></lv1>',
	    xml = parseXml(xml_str);*/

	var xml_str = '<?xml version="1.0" encoding="utf-8"?><module><title>Emergency Neurological Life Support</title><version>1.1</version><lastupdate>5/23/2013</lastupdate><comments><![CDATA[This is the first version of ENLS]]></comments><topic name="Ischemic Stroke" abbreviation="AIS"><node index="Begin" shortTitle="Begin"><title><![CDATA[Acute Ischemic Stroke]]></title><options>TIA,Less4.5hrs,Less8hrs,Nott-Pacandidate</options><body><![CDATA[Based on imaging and symptoms]]></body><explanation><![CDATA[The diagnosis of acute ischemic stroke is based on new onset focal neurological findings with an imaging study (CT or MRI of the brain) that shows no hemorrhage, or shows evidence of ischemic infarction.In some centers, patients may be screened at the door when EMS arrives and then is taken directly to CT (or MRI) based on symptoms of facial droop, dysarthria, gaze preference, motor weakness or other focal findings.If not completed already:<li>STAT vital signs, capillary glucose, CBC with platelets, PT/PTT, EKG, and beta-HCG for women</li><li>IV access</li><li>Supplemental oxygen to maintain saturation &gt;94% (hyperoxia may be detrimental in stroke, so no need for high flow oxygen)</li><li>Activate stroke code system (if available)</li><li>Stroke MD/team to evaluate patient with 5 minutes</li><li>Determine NIHSS score</li><i>Topic Co-Chairs:</i><br>Hartmut Gross, MD<br>Gene Sung, MD<br>]]></explanation></node><node index="LowriskTIA" shortTitle="Low risk TIA"><title><![CDATA[Low Risk TIA]]></title><options></options><body><![CDATA[ABCD2 Score 0-3]]></body><explanation><![CDATA[Outpatient workup:<br><li>Start on antithrombotic agent (ASA, clopidogrel 75 mg/day, or ASA/ extended release dipyridamole)</li><li>Carotid imaging: ultrasound, CTA or MRA</li><li>Consider echocardiography</li><li>Consider long-term cardiac monitor*</li><li>Smoking cessation</li><li>Initiate statin</li>*- if ECG or rhythm strip shows atrial fibrillation consider starting anticoagulation (oral anticoagulant or low molecular weight heparin) or ASA depending on CHAD2 score.]]></explanation></node><node index="TIA" shortTitle="TIA"><title><![CDATA[TIA]]></title><options>ABCD2</options><body><![CDATA[Symptoms have completely resolved]]></body><explanation><![CDATA[Diagnosis of TIA (transient ischemic attack) is based on new onset of focal neurological symptoms that are explainable by a vascular cause (i.e. arterial occlusion of a single or group of arteries adequately explain the patient\'s signs and symptoms) and these signs and symptoms resolve within 24 hours.]]></explanation></node><node index="Less4.5hrs" shortTitle="Less 4.5 hrs"><title><![CDATA[Symptom onset is &lt;4.5 hours]]></title><options>Strokeless3hours,Stroke3-4.5hours,t-Pacandidate,Nott-Pacandidate</options><body><![CDATA[Time from stroke symptom onset is &lt; 4.5 hours]]></body><explanation><![CDATA[Time of onset is when the patient was last seen normal.<li>If they can say when the first symptoms began, use that time</li><li>if an observer can say when they saw the symptoms begin (excluding wake up), use that time</li><li>If a patient awakens with a stroke, the time of onset is when they last went to bed</li>The time of onset is critical for using t-PA as the risk of intracerebral bleeding increases with increased time from stroke onset.  If you cannot establish the time with certainty, most physicians will not treat with t-PA.Advanced imaging techniques may be used to chose appropriate candidates for treatment beyond the 4.5 hour time window; such off-label use of t-PA is institutionally specific.]]></explanation></node><node index="Less8hrs" shortTitle="Less 8 hrs"><title><![CDATA[Symptom onset between 4.5 and 8 hours]]></title><options>Iatx</options><body><![CDATA[Outside IV t-PA window]]></body><explanation><![CDATA[Beyond 4.5 hours, IV t-PA is associated with intracerebral hemorrhage.  IA therapies may be helpful in this time window (and earlier as well).]]></explanation></node><node index="Nott-Pacandidate" shortTitle="Not t-PA candidate"><title><![CDATA[Patient is not an IV t-PA or IA treatment candidate]]></title><options>Iatx</options><body><![CDATA[Neither IV t-PA or IA intervention is appropriate]]></body><explanation><![CDATA[Common exclusions for IV t-PA are time (duration &gt; 4.5 hours), and contraindications to t-PA (recent surgery, current bleeding at a non-compressible site, etc.), and large area of infarction already present on the brain imaging study (>1/3 of the MCA territory). <br>IA exclusions include lack of large vessel occlusion on CTA or MRA, lack of consent from the patient or surrogate, or large area of infarction already present on the brain imaging study.  If IA intervention is not available at the treating hospital, but there is clinical or radiographic evidence of a large vessel occlusion, consider rapid transfer to a facility with this capability.]]></explanation></node><node index="t-Pacandidate" shortTitle="t-PA candidate"><title><![CDATA[Patient is an IV t-PA Candidate]]></title><options>BPbelow180/110,BPexceeds180/110</options><body><![CDATA[Is BP less than 180/110 mm Hg?]]></body><explanation><![CDATA[After reviewing the inclusion/exclusion criteria for IV t-PA use, the patient is eligible to receive the drug.  Current blood pressure is the last inclusion criteria.  If it is too high, the risk of ICH from t-PA is increased.  Steps can be taken to lower blood pressure so as to make the patient eligible for t-PA.]]></explanation></node><node index="Iatx" shortTitle="IA tx"><title><![CDATA[Endovascular treatment]]></title><options>Admit,Transfer</options><body><![CDATA[Consider IA thrombolysis or thrombectomy]]></body><explanation><![CDATA[If the patient has a large vessel occlusion (MCA, intracranial ICA, basilar or vertebral artery) and is within an 8 hour time window, IA treatment may be helpful. Large vessel occlusion can be suspected by seeing a hyperdense sign (clot within the vessel) on non-contrast CT imaging but this sign is insensitive.  CTA or MRA is diagnostic, as is conventional angiography.<br><li>Contact the neurointerventional physician on call; if the treating hospital does not have this capability, consider transfer to a comprehensive stroke center</li><li>Some hospitals use CT perfusion or MR perfusion techniques to select appropriate patients for intervention (ischemic penumbra)</li>]]></explanation></node><node index="Ivt-Paadmin" shortTitle="IV t-PA admin"><title><![CDATA[Administer IV t-PA]]></title><options>Improved,Noimprovement</options><body><![CDATA[Start IV t-PA infusion]]></body><explanation><![CDATA[After placing 2 peripheral IV lines:<br><li>Weight the patient; do not estimate body weight.</li><li>Mix (do not shake) 0.9 mg/kg t-PA, total dose not to exceed 90 mg.</li><li>Give 10% of the total dose of t-PA by bolus, then infuse the remaining dose over 1 hour.</li><br><u>Footnote:</u><br><i>As t-PA is dispensed in 50 and 100 mg bottles , it is suggested to draw off and discard any excess tPA to avoid accidental infusion of excess t-PA.  </i>]]></explanation></node><node index="ABCD2" shortTitle="ABCD2"><title><![CDATA[The ABCD2 Score]]></title><options>LowriskTIA,AdmitTIA</options><body><![CDATA[What is the predicted risk for stroke?]]></body><explanation><![CDATA[The ABCD2 score is a ordinal scale that provides risk prediction of stroke following the TIA.  It is scored as follows:<br><li><b>A</b>ge <u>&gt;</u> 60 years (add 1 point)</li><li><b>B</b>P = 140/90 mmHg at Initial Evaluation (add 1 point)</li><li><b>C</b>linical Features of the TIA: Speech Disturbance without Weakness (add 1 point) or Unilateral weakness (add 2 points)</li><li><b>D</b>uration of Symptoms: 10-59 minutes (add 1 point) or <u>&gt;</u> 60 minutes (add 2 points)</li><li><b>D</b>iabetes Mellitus in Patient\'s History (add 1 point)</li><li>Sum all the points from above for the total ABCD2 score (0-7)</li>The following is the estimated risk(%) of a stroke occurring within various time ranges:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total<u>Risk&nbsp;&nbsp;&nbsp;Score:&nbsp;&nbsp;&nbsp;2 day&nbsp;&nbsp;&nbsp;7 day&nbsp;&nbsp;&nbsp;90 days</u>Low&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0-3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.1<br>Mod&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4-5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5.9&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;9.8<br>High&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6-7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;12&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;18<br><br>Ref:<i>Cucchlara B et al, Ann Emerg Med 2008, 52:S27-39</i><br>Based on this risk stratification some physicians choose to admit high risk patients and discharge low risk, and controversy exists about moderate risk patients.]]></explanation></node><node index="Transfer" shortTitle="Transfer"><title><![CDATA[Transfer the patient]]></title><options></options><body><![CDATA[For IA treatment or need for ICU]]></body><explanation><![CDATA[Consider patient transfer if<li>The is evidence of large vessel occlusion (CTA/MRA, hyperdense vessel sign on imaging; or clinical findings consistent with an MCA stroke) and the patient can arrive and be treated at the receiving hospital within 8 hours of symptom onset.</li><li>The treating hospital cannot provide the level of care for the patient ICU for example). Patient outcomes have been shown to improve if the patient is treated in a stroke center.</li>]]></explanation></node><node index="AdmitTIA" shortTitle="Admit TIA"><title><![CDATA[Not low risk]]></title><options></options><body><![CDATA[TIA risk moderate or high, or unable to arrange timely outpatient work-up and follow-up]]></body><explanation><![CDATA[Admit for observation:<li>Permissive hypertension (not to exceed 220/120 mm Hg</li><li>Start ASA, clopidogrel or ASA/extendedrelease dipyridamole</li><li>Carotid imaging: ultrasound, CTA or MRA</li><li>Consider echocardiography</li><li>Telemetry*</li><li>Smoking cessation</li><li>Initiate statin</li><li>Consider keeping patient flat to improve brain perfusion (controversial)</li>*if ECG or rhythm strip shows atrial fibrillation consider starting anticoagulation (oral anticoagulant or low molecular weight heparin) or ASA depending on CHAD2 score.]]></explanation></node><node index="Improved" shortTitle="Improved"><title><![CDATA[Patient improves following t-PA]]></title><options>Admit,Transfer</options><body><![CDATA[Measurable improvement within 1 hour?]]></body><explanation><![CDATA[Often this is defined as a lowering of the NIHSS score, and there is no clear consensus as to how much.]]></explanation></node><node index="Noimprovement" shortTitle="No improvement"><title><![CDATA[No improvement following t-PA]]></title><options>Iatx</options><body><![CDATA[Within 1 hour no change in exam?]]></body><explanation><![CDATA[Often this is defined as no change in the NIHSS score.]]></explanation></node><node index="Strokeless3hours" shortTitle="Stroke less 3 hours"><title><![CDATA[Onset  less than 3 hours]]></title><options></options><body><![CDATA[Time from stroke symptom onset is less than 3 hours]]></body><explanation><![CDATA[Check eligibility for on-label (US and elsewhere) use of IV t-PA:<li>Diagnosis of ischemic stroke causing measurable neurological deficit.</li><li> The neurological signs should not be clearing spontaneously.</li><li>The neurological signs should not be minor and isolated.</li><li>Caution should be exercised in treating a patient with major deficits.</li><li>The symptoms of stroke should not be suggestive of subarachnoid hemorrhage.</li><li>No head trauma or prior stroke in previous 3 months.</li><li>No myocardial infarction in the previous 3 months.</li><li>No gastrointestinal or urinary tract hemorrhage in previous 21 days.</li><li>No major surgery in the previous 14 days.</li><li>No arterial puncture at a noncompressible site in the previous 7 days.</li><li>No history of previous intracranial hemorrhage.</li><li>Blood pressure not elevated (systolic &lt; 185 mm Hg and diastolic &lt; 110 mm Hg).</li><li>No evidence of active bleeding or acute trauma (fracture) on examination.</li><li>Not taking an oral anticoagulant or, if anticoagulant being taken, INR <u>&lt;</u> 1.7.</li><li>If receiving heparin in previous 48 hours, aPTT must be in normal range.</li><li>Platelet count <u>&lt;</u>100 000 mm3.</li><li>Blood glucose concentration <u>&lt;</u> 50 mg/dL (2.7 mmol/L).</li><li>No seizure with postictal residual neurological impairments.</li><li>CT does not show a multilobar infarction (hypodensity &gt;1/3 cerebral hemisphere).</li><li>The patient or family members understand the potential risks and benefits from treatment.</li>]]></explanation></node><node index="Stroke3-4.5hours" shortTitle="Stroke 3 - 4.5 hours"><title><![CDATA[Onset between 3 and 4.5 hours]]></title><options></options><body><![CDATA[Time from stroke onset is between 3 and 4.5 hours]]></body><explanation><![CDATA[In the US, t-PA is not yet approved for 3-4.5 use, although it is approved in Europe and Canada.  The inclusion criteria are similar to those of &lt; 3 hours, but are modified as follows:<li>Age &lt;  80 years<li>No anticoagulant use, regardless of INR<li>NIHSS &lt; = 25<li>No combined history of prior stroke <u>and</u> diabetes</li>]]></explanation></node><node index="BPbelow180/110" shortTitle="BP below 180/110"><title><![CDATA[Yes]]></title><options>Ivt-Paadmin</options><body><![CDATA[BP is less than 180/110]]></body><explanation><![CDATA[The patient is eligible for IV t-PA.<br>Place two peripheral IV lines.]]></explanation></node><node index="BPexceeds180/110" shortTitle="BP exceeds 180/110"><title><![CDATA[No]]></title><options></options><body><![CDATA[Blood pressure exceeds 180 over 110 mm Hg]]></body><explanation><![CDATA[This is too high for IV t-PA administration and requires gentle reduction prior to initiating t-PA.<br><li>Labetalol 10 mg IV every 10 minutes (consider doubling dose (i.e. 20, 40, 80) to max total dose of 150 mg.  Start maintenance infusion.</li><li>Nicardipine IV- start 5 mg/h, titrate up by 2.5 mg/h at 5- to 15-minute intervals, maximum dose 15 mg/h; when desired blood pressure attained, reduce to 3 mg/h</li><br>If BP falls below 180/110, proceed to IV t-PA administration.<br><br>If BP proves refractory to the above, the patient is considered too high risk for intracerebral hemorrhage and should not be treated with t-PA.  Continue to treat BP to keep less than 220/120 however.<br><u>Footnote:</u><br><i>While nitroglycerin paste (for patients with no IV access), labetalol, and nicardipine are recommended by the American Stroke association, other new drugs are available, but not yet studied in acute stroke management, including clevidipine.  Be sure to initiate a drip as boluses will wear off and BP will likely return to its previous high levels.Permissive hypertension is allowed for TIA, as it is for non-t-PA treated patients, up to 220/120.</i>]]></explanation></node><node index="Admit" shortTitle="Admit"><title><![CDATA[Hospital Admission]]></title><options></options><body><![CDATA[While waiting for ICU bed]]></body><explanation><![CDATA[After IV, IA or no specific treatment consider the following initial admission orders:<li>Neuro check  q30 min x 6 hrs., then q1 hr.</li><li>Oxygenation to keep O2 sat>94%</li><li>BP check q 15 min x 2 hrs., then q 30 min x 6 h, then q 1h x 16 h</li><li>BP-after reperfusion treatment keep &lt;180/105 (Note: this is lower than pretreatment values); if no t-PA given, keep BP &lt;220/120</li><li>Bedside swallow test  (30 mL water PO) before anything else PO</li><li>Keep glucose &lt;140, consider insulin drip</li><li>IVF (NS) to keep euvolemia</li><li>Monitor for A-fib</li><li>Treat fever sources with antipyretics</li>If t-PA was administered:<li>avoid indwelling urinary catheter, nasogastric tubes, intra-arterial catheters for 4 hours; do not give anticoagulant/antiplatelet therapy for 24 hours; repeat head CT or MRI at 24 hrs. before starting anticoagulant/antiplatelet meds</li>Watch for complications of t-PA, including<li>Airway obstruction due to angioedema- consider rapid intubation</li><li>Hemorrhage- stop t-PA</li><li>Sudden deterioration in mental status- see below</li><li>Severe hypertension or hypotension- may be signs of ICH or systemic hemorrhage</li>A sudden decline in neurological exam during or following t-PA administration may be due to an intracranial hemorrhage.  This is often accompanied by a marked rise in blood pressure; however, a marked rise or fall in blood pressure alone may signal an ICH.  Do the following immediately:<li>STOP t-PA infusion</li><li>Obtain STAT head CT scan</li><li>Notify your neurosurgeon on call; if not available begin the process to transfer the patient to a facility with neurosurgical capability once the CT scan results are available</li><li>Stat labs: PT,PTT, Platelets, fibrinogen, type and cross 2-4 unit PRBCs</li>Give the following:<li>6-8 units of cryoprecipitate</li><li>6-8 units of platelets</li><li>Consider 40-80 mcg/kg of recombinant Factor VIIa while waiting for platelets and cryoprecipitate</li>]]></explanation></node></topic><notes><title><![CDATA[Key Points to Relay:]]></title><content><li>Age</li><li>Airway status</li><li>Time of symptom onset</li><li>NIHSS</li><li>CT or MRI results</li></content></notes><checklist><title><![CDATA[Checklist]]></title><list><li>Labs: capillary glucose, CBC with platelets, PT/PTT, EKG, and beta-HCG for women</li><li>IV access</li><li>Supplemental oxygen to maintain saturation > 94%</li><li>Activate stroke code system (if available)</li><li>Determine NIHSS score</li></list></checklist></module>',
	    xml = parseXml(xml_str);

	//console.log(xml.documentElement.nodeName);
	//console.log(xml.childNode.nodeName);

	//根节点
	var root = xml.documentElement;

	//输出
	var output = '<ul>';



	//main
	(function foo(node){

		var children = node.children,
			children_len = children.length;

		//开始构建该节点
		output += '<li class="tree">';

			//开始构建自身内容
			output += '<div class="self">';

				//取该节点名字
				output += '<span class="nodeName">' + node.nodeName + '</span>';

				//取构建节点信息
				output += fragInfo(node, children_len);

			//结束构建该节点自身内容
			output += '</div>';


			//构建子节点内容
			if(children_len > 0){

				//如果有子节点
				//递归子节点
				output += '<ul class="tree">';
				for(var i=0; i<children_len; i++){
					arguments.callee(children[i]);
				}
				output += '</ul>';
			}

		//结束构建该节点
		output += '</li>';


	})(root);



	output += '</ul>';

	//console.log(output);

	document.getElementById("show").innerHTML = output;


	//lib

	//构建节点信息
	function fragInfo(node, children_len){

		var fragment = '';
		
		//取节点信息-属性
		fragment += fragAttr(node);

		//如果无子节点
		//取节点信息-值
		if(children_len == 0){
			
			//Text or CDATASection
			//output += '<div class="nodeValue">' + '值：' + node.childNodes[0] + '</div>';
			var childNodes = node.childNodes,
				text_value = '';

			//如果有值
			if(childNodes.length){
				text_value = htmlEnCode(childNodes[0].nodeValue);
			}
			
			fragment += '<div class="nodeValue">' + 'value：' + text_value + '</div>';
		}

		//如果有内容，用div包装
		if(fragment){
			fragment = '<div class="nodeInfo">' + fragment + '</div>';
		}

		return fragment;
	}

	//构建节点信息-属性
	function fragAttr(node){

		var attr = node.attributes,
			attr_length = attr.length,
			fragment = '';

		//判断有无属性
		if(attr_length){
			//开始构建节点信息-属性
			fragment += '<div class="attr">';

				//tit
				fragment += '<div class="tit">attributes</div>';

				//开始构建属性列表
				fragment += '<ul class="attrList">';

					for(var i=0; i<attr_length; i++){
						fragment += '<li><span class="attrName">' + attr[i].nodeName + '</span>: <span class="attrValue">' + attr[i].nodeValue + '</li>';
					}

				//结束构建属性列表
				fragment += '</ul>';

			
			//结束构建节点信息-属性
			fragment += '</div>';
		}

		return fragment;
	}

	//转义组件开始
	function htmlEnCode(text){
        var temp = document.createElement("DIV"); 
        setInnerText(temp, text);
        text = temp.innerHTML;
        temp = null;

        return text; 
    }

    function setInnerText(element, text){                   //debug ff
        if(typeof element.textContent == "string"){
            element.textContent = text;
        }else{
            element.innerText = text;
        }
    }
	//转义组件结束

	/*

	异步加载：
	http://www.oschina.net/question/201107_70078

	字符串解析：
	http://stackoverflow.com/questions/649614/xml-parsing-of-a-variable-string-in-javascript/8412989#8412989

	*/