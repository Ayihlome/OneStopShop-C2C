import svgPaths from "./svg-85eicg0aa4";
import imgProfessionalMechanicVerifyingDocuments from "./782ecc7eff5b3f57a7642819d4d612325571de54.png";

function Container() {
  return (
    <div className="h-[7.963px] relative shrink-0 w-[10.442px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.4417 7.9625">
        <g id="Container">
          <path d={svgPaths.p90c9340} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#00346f] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[40px]" data-name="Background">
      <div className="-translate-x-1/2 absolute bg-[rgba(255,255,255,0)] left-1/2 rounded-[12px] shadow-[0px_0px_0px_4px_#f8f9fa] size-[40px] top-0" data-name="Overlay+Shadow" />
      <Container />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] w-[85.64px]">
        <p className="leading-[16px]">Step 1: Identity</p>
      </div>
    </div>
  );
}

function Step1IdentityComplete() {
  return (
    <div className="bg-[#f8f9fa] content-stretch flex flex-col gap-[12px] items-center px-[16px] relative shrink-0" data-name="Step 1: Identity (Complete)">
      <Background />
      <Container1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[17.97px]">
        <p className="leading-[20px]">02</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#00346f] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[48px]" data-name="Background">
      <div className="-translate-x-1/2 absolute bg-[rgba(255,255,255,0)] left-1/2 rounded-[12px] shadow-[0px_0px_0px_4px_#d7e2ff,0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[48px] top-0" data-name="Overlay+Shadow" />
      <Container2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#00346f] text-[12px] w-[110.88px]">
        <p className="[text-decoration-skip-ink:none] decoration-solid leading-[16px] underline">Step 2: Verification</p>
      </div>
    </div>
  );
}

function Step2VerificationActive() {
  return (
    <div className="bg-[#f8f9fa] content-stretch flex flex-col gap-[12px] items-center px-[16px] relative shrink-0" data-name="Step 2: Verification (Active)">
      <Background1 />
      <Container3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#737783] text-[14px] w-[18.16px]">
          <p className="leading-[20px]">03</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#e7e8e9] content-stretch flex items-center justify-center p-px relative rounded-[12px] shrink-0 size-[40px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(194,198,211,0.2)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="-translate-x-1/2 absolute bg-[rgba(255,255,255,0)] left-1/2 rounded-[12px] shadow-[0px_0px_0px_4px_#f8f9fa] size-[40px] top-0" data-name="Overlay+Shadow" />
      <Container4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col h-[14px] items-start relative shrink-0 w-[86px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] not-italic relative shrink-0 text-[#737783] text-[12px] w-[91px]">
        <p className="leading-[16px]">Step 3: Contact</p>
      </div>
    </div>
  );
}

function Step3PayoutsPending() {
  return (
    <div className="bg-[#f8f9fa] content-stretch flex flex-col gap-[12px] items-center px-[16px] relative shrink-0" data-name="Step 3: Payouts (Pending)">
      <BackgroundBorder />
      <Container5 />
    </div>
  );
}

function ProgressStepper() {
  return (
    <div className="content-stretch flex items-center justify-between max-w-[768px] relative shrink-0 w-[768px]" data-name="Progress Stepper">
      <div className="-translate-y-1/2 absolute bg-[#e7e8e9] h-[2px] left-0 right-0 top-1/2" data-name="Line background" />
      <Step1IdentityComplete />
      <Step2VerificationActive />
      <Step3PayoutsPending />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:Extra_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00346f] text-[30px] tracking-[-0.75px] w-full">
        <p className="leading-[36px]">Professional Credentialing</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[672px] relative shrink-0 w-[672px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[52px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[16px] w-[668.48px]">
        <p className="leading-[26px] mb-0">To ensure the safety of our community, please provide the following documentation. Our</p>
        <p className="leading-[26px]">compliance team will review your application within 24-48 hours.</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Container8 />
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[21px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 21">
        <g id="Container">
          <path d={svgPaths.p13774060} fill="var(--fill-0, #00346F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#d7e2ff] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[56px]" data-name="Background">
      <Container11 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[18px] w-[159.52px]">
        <p className="leading-[28px]">ASE Certifications</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] w-[428.02px]">
        <p className="leading-[20px] mb-0">Upload valid National Institute for Automotive Service Excellence</p>
        <p className="leading-[20px]">certificates.</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#c2c6d3] text-[11px] tracking-[1.1px] uppercase w-[169.56px]">
        <p className="leading-[16.5px]">Accepted: PDF, JPG, PNG</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative self-stretch shrink-0 w-[428.02px]" data-name="Container">
      <Heading1 />
      <Container13 />
      <Container14 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0" data-name="Container">
      <Background2 />
      <Container12 />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[16.667px] relative shrink-0 w-[13.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 16.6667">
        <g id="Container">
          <path d={svgPaths.p34585080} fill="var(--fill-0, #00346F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#f3f4f5] content-stretch flex gap-[23.9px] items-center pl-[25px] pr-[40.92px] py-[13px] relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(194,198,211,0.2)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container15 />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[48px] justify-center leading-[0] not-italic relative shrink-0 text-[#00346f] text-[16px] text-center w-[57.74px]">
        <p className="leading-[24px] mb-0">Browse</p>
        <p className="leading-[24px]">Files</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
          <Container10 />
          <Button />
        </div>
      </div>
    </div>
  );
}

function AseCertificationsZone() {
  return (
    <div className="bg-white drop-shadow-[0px_20px_20px_rgba(25,28,29,0.04)] relative rounded-[8px] shrink-0 w-full" data-name="ASE Certifications Zone">
      <div aria-hidden="true" className="absolute border border-[rgba(194,198,211,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col items-start p-[33px] relative size-full">
        <Container9 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p5df7b00} fill="var(--fill-0, #4E5F7F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#d7e2ff] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[56px]" data-name="Background">
      <Container18 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[18px] w-[201.34px]">
        <p className="leading-[28px]">State Business License</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] w-[462.55px]">
        <p className="leading-[20px] mb-0">Proof of registration as a licensed mechanical service provider in your</p>
        <p className="leading-[20px]">state.</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#c2c6d3] text-[11px] tracking-[1.1px] uppercase w-[134.33px]">
        <p className="leading-[16.5px]">Accepted: PDF, JPG</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative self-stretch shrink-0 w-[462.55px]" data-name="Container">
      <Heading2 />
      <Container20 />
      <Container21 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0" data-name="Container">
      <Background3 />
      <Container19 />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[16.667px] relative shrink-0 w-[13.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 16.6667">
        <g id="Container">
          <path d={svgPaths.p34585080} fill="var(--fill-0, #00346F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#f3f4f5] content-stretch flex gap-[24.5px] items-center pl-[25px] pr-[41.52px] py-[13px] relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(194,198,211,0.2)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container22 />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[48px] justify-center leading-[0] not-italic relative shrink-0 text-[#00346f] text-[16px] text-center w-[57.73px]">
        <p className="leading-[24px] mb-0">Browse</p>
        <p className="leading-[24px]">Files</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container17 />
        <Button1 />
      </div>
    </div>
  );
}

function StateBusinessLicenseZone() {
  return (
    <div className="bg-white drop-shadow-[0px_20px_20px_rgba(25,28,29,0.04)] relative rounded-[8px] shrink-0 w-full" data-name="State Business License Zone">
      <div aria-hidden="true" className="absolute border border-[rgba(194,198,211,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col items-start p-[33px] relative size-full">
        <Container16 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
        <g id="Container">
          <path d={svgPaths.p2bdb86e0} fill="var(--fill-0, #7B2F00)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#ffdbcc] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[56px]" data-name="Background">
      <Container25 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[18px] w-[159.13px]">
        <p className="leading-[28px]">Liability Insurance</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] w-[445.44px]">
        <p className="leading-[20px] mb-0">General liability coverage (minimum $1M recommended) for on-site</p>
        <p className="leading-[20px]">services.</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#c2c6d3] text-[11px] tracking-[1.1px] uppercase w-[101.5px]">
        <p className="leading-[16.5px]">Accepted: PDF</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative self-stretch shrink-0 w-[445.44px]" data-name="Container">
      <Heading3 />
      <Container27 />
      <Container28 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0" data-name="Container">
      <Background4 />
      <Container26 />
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[16.667px] relative shrink-0 w-[13.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 16.6667">
        <g id="Container">
          <path d={svgPaths.p34585080} fill="var(--fill-0, #00346F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#f3f4f5] content-stretch flex gap-[23.98px] items-center pl-[25px] pr-[40.99px] py-[13px] relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(194,198,211,0.2)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container29 />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[48px] justify-center leading-[0] not-italic relative shrink-0 text-[#00346f] text-[16px] text-center w-[57.73px]">
        <p className="leading-[24px] mb-0">Browse</p>
        <p className="leading-[24px]">Files</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
          <Container24 />
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function LiabilityInsuranceZone() {
  return (
    <div className="bg-white drop-shadow-[0px_20px_20px_rgba(25,28,29,0.04)] relative rounded-[8px] shrink-0 w-full" data-name="Liability Insurance Zone">
      <div aria-hidden="true" className="absolute border border-[rgba(194,198,211,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col items-start p-[33px] relative size-full">
        <Container23 />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p300a1100} fill="var(--fill-0, #4E5F7F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative size-full">
        <Container30 />
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[16px] text-center w-[38.17px]">
          <p className="leading-[24px]">Back</p>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#00346f] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[40px] py-[16px] relative size-full">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-[0_0.05px_0_0] rounded-[4px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" data-name="Button:shadow" />
        <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white w-[165px]">
          <p className="leading-[24px]">Submit for Review</p>
        </div>
      </div>
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="relative shrink-0 w-full" data-name="Action Buttons">
      <div aria-hidden="true" className="absolute border-[rgba(194,198,211,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pt-[33px] relative size-full">
          <Button3 />
          <Button4 />
        </div>
      </div>
    </div>
  );
}

function MainContentAreaUploadZones() {
  return (
    <div className="col-[1/span_8] content-stretch flex flex-col gap-[32px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Main Content Area (Upload Zones)">
      <Container7 />
      <AseCertificationsZone />
      <StateBusinessLicenseZone />
      <LiabilityInsuranceZone />
      <ActionButtons />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20px] text-white w-full">
        <p className="leading-[28px]">The Trust Framework</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-90 relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9bbdff] text-[14px] w-full">
        <p className="leading-[22.75px] mb-0">Verification is the cornerstone of the ProMech</p>
        <p className="leading-[22.75px] mb-0">platform. By completing this step, you unlock</p>
        <p className="leading-[22.75px]">premium features and customer visibility.</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="h-[22px] relative shrink-0 w-[16px]" data-name="Margin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 22">
        <g id="Margin">
          <path d={svgPaths.p33feb5c0} fill="var(--fill-0, #C6D7FD)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[14.08px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[60px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[264.58px]">
        <p className="leading-[20px] mb-0">Gold Badge Listing</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] mb-0">Appear at the top of local search results</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px]">with a verified badge.</p>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="content-stretch flex gap-[11.99px] items-start relative shrink-0 w-full" data-name="Item">
      <Margin />
      <Container32 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[19px]" data-name="Margin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 20">
        <g id="Margin">
          <path d={svgPaths.p297583e0} fill="var(--fill-0, #C6D7FD)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[70.08px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[60px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[208.58px]">
        <p className="leading-[20px] mb-0">Instant Payouts</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] mb-0">Get paid within 24 hours of job</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px]">completion via secure gateway.</p>
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div className="content-stretch flex gap-[11.99px] items-start relative shrink-0 w-full" data-name="Item">
      <Margin1 />
      <Container33 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="h-[21px] relative shrink-0 w-[18px]" data-name="Margin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 21">
        <g id="Margin">
          <path d={svgPaths.p9b41710} fill="var(--fill-0, #C6D7FD)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[33.75px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[60px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[244.91px]">
        <p className="leading-[20px] mb-0">Legal Protection</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] mb-0">Access to platform-mediated dispute</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px]">resolution and support.</p>
      </div>
    </div>
  );
}

function Item2() {
  return (
    <div className="content-stretch flex gap-[11.99px] items-start relative shrink-0 w-full" data-name="Item">
      <Margin2 />
      <Container34 />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pt-[9.2px] relative shrink-0 w-full" data-name="List">
      <Item />
      <Item1 />
      <Item2 />
    </div>
  );
}

function ProfessionalMechanicVerifyingDocuments() {
  return (
    <div className="h-[160px] relative rounded-[4px] shrink-0 w-full" data-name="Professional mechanic verifying documents">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none rounded-[4px]">
        <img alt="" className="absolute h-[196.67%] left-0 max-w-none top-[-48.33%] w-full" src={imgProfessionalMechanicVerifyingDocuments} />
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[42.2px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <ProfessionalMechanicVerifyingDocuments />
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#00346f] relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[14.8px] items-start p-[32px] relative size-full">
          <div className="absolute bg-[rgba(0,74,153,0.3)] blur-[32px] right-[-64px] rounded-[12px] size-[128px] top-[-64px]" data-name="Abstract pattern background" />
          <Heading4 />
          <Container31 />
          <List />
          <HorizontalBorder />
        </div>
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[14px] tracking-[0.7px] uppercase w-full">
          <p className="leading-[20px]">{`Support & Help`}</p>
        </div>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] w-full">
          <p className="leading-[19.5px] mb-0">Having trouble uploading documents or need clarity on</p>
          <p className="leading-[19.5px]">requirements?</p>
        </div>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[8px] relative shrink-0 w-[4.933px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.93333 8">
        <g id="Container">
          <path d={svgPaths.p39c06800} fill="var(--fill-0, #00346F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#00346f] text-[14px] w-[152.25px]">
          <p className="leading-[20px]">Contact Support Team</p>
        </div>
        <Container36 />
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#f3f4f5] relative rounded-[8px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(194,198,211,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative size-full">
        <Heading5 />
        <Container35 />
        <Link />
      </div>
    </div>
  );
}

function AsideSidebarWhyVerificationMatters() {
  return (
    <div className="col-[9/span_4] content-stretch flex flex-col gap-[24px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Aside - Sidebar: Why Verification Matters">
      <Background5 />
      <BackgroundBorder1 />
    </div>
  );
}

function Container6() {
  return (
    <div className="gap-x-[48px] gap-y-[48px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_818.25px] relative shrink-0 w-full" data-name="Container">
      <MainContentAreaUploadZones />
      <AsideSidebarWhyVerificationMatters />
    </div>
  );
}

function Main() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Main">
      <div className="flex flex-col items-center max-w-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[48px] items-center max-w-[inherit] pb-[48px] pt-[96px] px-[24px] relative size-full">
          <ProgressStepper />
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[#1e3a8a] text-[20px] tracking-[-0.5px] w-[204px]">
        <p className="leading-[28px]">Mechanic Verification</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="Container">
          <path d={svgPaths.p1988dd00} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[36px] relative shrink-0 w-[32px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 36">
        <g id="Container">
          <path d={svgPaths.p121cc980} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container42() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#001b3f] text-[12px] w-[15.63px]">
          <p className="leading-[16px]">JD</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-[#d7e2ff] content-stretch flex items-center justify-center p-[2px] relative rounded-[12px] shrink-0 size-[32px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#f8f9fa] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container42 />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Container">
      <Container40 />
      <Container41 />
      <BackgroundBorder2 />
    </div>
  );
}

function Container37() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center max-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between max-w-[inherit] px-[24px] py-[16px] relative size-full">
          <Container38 />
          <Container39 />
        </div>
      </div>
    </div>
  );
}

function HeaderTopNavBarSharedComponent() {
  return (
    <div className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col items-start left-0 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] top-0 w-[1280px]" data-name="Header - TopNavBar (Shared Component)">
      <Container37 />
    </div>
  );
}

export default function MechanicVerification() {
  return (
    <div className="bg-[#f8f9fa] content-stretch flex flex-col items-start relative size-full" data-name="Mechanic Verification">
      <Main />
      <HeaderTopNavBarSharedComponent />
    </div>
  );
}