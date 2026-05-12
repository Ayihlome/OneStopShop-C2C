import svgPaths from "./svg-l5mzu4whsz";

function Background() {
  return (
    <div className="bg-[#c6d7fd] content-stretch flex items-start px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#4d5d7e] text-[10px] tracking-[1px] uppercase w-[140.73px]">
        <p className="leading-[15px]">Onboarding: Phase 01</p>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:Extra_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00346f] text-[48px] tracking-[-2.4px] w-full">
        <p className="leading-[60px] mb-0">Build your</p>
        <p className="leading-[60px] mb-0">architectural</p>
        <p className="leading-[60px]">identity.</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[448px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[18px] w-full">
        <p className="leading-[29.25px] mb-0">Trust begins with professional clarity.</p>
        <p className="leading-[29.25px] mb-0">Complete your profile to join our network of</p>
        <p className="leading-[29.25px]">elite automotive specialists.</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Background />
      <Heading />
      <Container1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p7b061c0} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#00346f] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[40px]" data-name="Background">
      <Container3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] w-[110.97px]">
        <p className="leading-[24px]">Identity Setup</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] w-[207.09px]">
        <p className="leading-[20px]">Basic information and specialty</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[207.09px]" data-name="Container">
      <Container5 />
      <Container6 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Background1 />
      <Container4 />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
        <g id="Container">
          <path d={svgPaths.p15aec574} fill="var(--fill-0, #191C1D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#e1e3e4] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[40px]" data-name="Background">
      <Container8 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] w-[90.17px]">
        <p className="leading-[24px]">Verification</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] w-[160.95px]">
        <p className="leading-[20px]">{`Certification & ID upload`}</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[160.95px]" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[16px] items-center opacity-40 relative shrink-0 w-full" data-name="Container">
      <Background2 />
      <Container9 />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[16px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 16">
        <g id="Container">
          <path d={svgPaths.p26835240} fill="var(--fill-0, #191C1D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#e1e3e4] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[40px]" data-name="Background">
      <Container13 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] w-[123.47px]">
        <p className="leading-[24px]">Contact Option</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] w-[167.97px]">
        <p className="leading-[20px]">Connection to WhatsApp</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[167.97px]" data-name="Container">
      <Container15 />
      <Container16 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[16px] items-center opacity-40 relative shrink-0 w-full" data-name="Container">
      <Background3 />
      <Container14 />
    </div>
  );
}

function ProgressVisual() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Progress Visual">
      <Container2 />
      <Container7 />
      <Container12 />
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.875px] relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] w-full">
          <p className="leading-[22.75px] mb-0">{`"Since joining OneStopShop, my high-end`}</p>
          <p className="leading-[22.75px] mb-0">service requests have increased by 40%. The</p>
          <p className="leading-[22.75px] mb-0">profile layout really highlights my technical</p>
          <p className="leading-[22.75px]">{`certifications."`}</p>
        </div>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[12px] w-full">
          <p className="leading-[16px]">— Marco Rossi, Master Technician</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundVerticalBorder() {
  return (
    <div className="bg-[#f3f4f5] relative rounded-[8px] shrink-0 w-full" data-name="Background+VerticalBorder">
      <div aria-hidden="true" className="absolute border-[#00346f] border-l-4 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[24px] pl-[28px] pr-[24px] pt-[23.125px] relative size-full">
        <Container17 />
        <Container18 />
      </div>
    </div>
  );
}

function LeftColumnEditorialContentProgress() {
  return (
    <div className="col-[1/span_4] content-stretch flex flex-col gap-[40px] items-start justify-self-stretch pb-[94.75px] relative row-1 self-start shrink-0" data-name="Left Column: Editorial Content & Progress">
      <Container />
      <ProgressVisual />
      <BackgroundVerticalBorder />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[19px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 19">
        <g id="Container">
          <path d={svgPaths.p244a0ae0} fill="var(--fill-0, #00346F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Heading 2">
      <Container19 />
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] w-[161.13px]">
        <p className="leading-[24px]">Professional Identity</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737783] text-[16px] w-full">
        <p className="leading-[normal]">e.g. Apex Performance Tuning</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f8f9fa] relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[16px] py-[18px] relative size-full">
          <Container22 />
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[8.5px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] tracking-[0.6px] uppercase w-[168.47px]">
        <p className="leading-[16px]">Business or Shop Name</p>
      </div>
      <Input />
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d="M7.2 9.6L12 14.4L16.8 9.6" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        </g>
      </svg>
    </div>
  );
}

function ImageFill() {
  return (
    <div className="absolute content-stretch flex flex-col h-[56px] items-start justify-center left-0 overflow-clip pl-[312px] pr-[8px] py-[16px] top-0 w-[344px]" data-name="image fill">
      <Svg />
    </div>
  );
}

function Container24() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[16px] overflow-clip right-[16px] top-1/2" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[16px] w-[135.81px]">
        <p className="leading-[24px]">Select experience</p>
      </div>
    </div>
  );
}

function Options() {
  return (
    <div className="bg-[#f8f9fa] h-[56px] relative rounded-[4px] shrink-0 w-full" data-name="Options">
      <ImageFill />
      <Container24 />
    </div>
  );
}

function Container23() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[8.5px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] tracking-[0.6px] uppercase w-[148.47px]">
        <p className="leading-[16px]">Years of Experience</p>
      </div>
      <Options />
    </div>
  );
}

function Container20() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_80px] relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <Container23 />
    </div>
  );
}

function SectionBusinessDetails() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Section: Business Details">
      <Heading1 />
      <Container20 />
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[20px] relative shrink-0 w-[21.175px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.175 20">
        <g id="Container">
          <path d={svgPaths.p3a788fdc} fill="var(--fill-0, #00346F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Heading 2">
      <Container26 />
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] w-[164.63px]">
        <p className="leading-[24px]">Technical Specialties</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] w-[104.09px]">
        <p className="leading-[16px]">Select at least two</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Container27 />
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[13.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 16.5">
        <g id="Container">
          <path d={svgPaths.p21efa100} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#00346f] content-stretch flex gap-[8px] items-center px-[17px] py-[9px] relative rounded-[12px] shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#00346f] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container29 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[111.78px]">
        <p className="leading-[20px]">{`Electric & Hybrid`}</p>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="absolute bottom-[50px] content-stretch flex flex-col items-start left-0 top-0" data-name="Label">
      <BackgroundBorder />
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[12px] relative shrink-0 w-[15.001px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.0013 12">
        <g id="Container">
          <path d={svgPaths.p24c58710} fill="var(--fill-0, #191C1D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Border() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[17px] py-[9px] relative rounded-[12px] shrink-0" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#c2c6d3] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container30 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[14px] w-[124.39px]">
        <p className="leading-[20px]">High-Performance</p>
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="absolute bottom-[50px] content-stretch flex flex-col items-start left-[183.78px] top-0" data-name="Label">
      <Border />
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[13.879px] relative shrink-0 w-[13.524px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5239 13.8794">
        <g id="Container">
          <path d={svgPaths.p2018a400} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#00346f] content-stretch flex gap-[8px] items-center px-[17px] py-[9px] relative rounded-[12px] shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#00346f] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container31 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[128.03px]">
        <p className="leading-[20px]">Engine Diagnostics</p>
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="absolute bottom-[50px] content-stretch flex flex-col items-start left-[380.17px] top-0" data-name="Label">
      <BackgroundBorder1 />
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[18px] relative shrink-0 w-[13.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 18">
        <g id="Container">
          <path d={svgPaths.p17d21200} fill="var(--fill-0, #191C1D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Border1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[17px] py-[9px] relative rounded-[12px] shrink-0" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#c2c6d3] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container32 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[14px] w-[89.06px]">
        <p className="leading-[20px]">Transmission</p>
      </div>
    </div>
  );
}

function Label3() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start left-0 top-[50px]" data-name="Label">
      <Border1 />
    </div>
  );
}

function Container33() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Container">
          <path d={svgPaths.p468a380} fill="var(--fill-0, #191C1D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Border2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[17px] py-[9px] relative rounded-[12px] shrink-0" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#c2c6d3] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container33 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[14px] w-[100.22px]">
        <p className="leading-[20px]">HVAC Systems</p>
      </div>
    </div>
  );
}

function Label4() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start left-[161.06px] top-[50px]" data-name="Label">
      <Border2 />
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[14.25px] relative shrink-0 w-[16.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 14.25">
        <g id="Container">
          <path d={svgPaths.p39a88900} fill="var(--fill-0, #191C1D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Border3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[17px] py-[9px] relative rounded-[12px] shrink-0" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#c2c6d3] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container34 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[14px] w-[133.09px]">
        <p className="leading-[20px]">{`Brake & Suspension`}</p>
      </div>
    </div>
  );
}

function Label5() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start left-[333.28px] top-[50px]" data-name="Label">
      <Border3 />
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[88px] relative shrink-0 w-full" data-name="Container">
      <Label />
      <Label1 />
      <Label2 />
      <Label3 />
      <Label4 />
      <Label5 />
    </div>
  );
}

function SectionSpecialtySelectionPillStyle() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Section: Specialty Selection (Pill Style)">
      <Container25 />
      <Container28 />
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[16px] relative shrink-0 w-[19.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 16">
        <g id="Container">
          <path d={svgPaths.p29002e00} fill="var(--fill-0, #00346F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Heading 2">
      <Container35 />
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] w-[172.38px]">
        <p className="leading-[24px]">Professional Narrative</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737783] text-[16px] w-full whitespace-pre-wrap">
        <p className="leading-[24px] mb-0">{`Describe your experience, the types of vehicles you master, and why clients should trust `}</p>
        <p className="leading-[24px]">your craftsmanship...</p>
      </div>
    </div>
  );
}

function Textarea() {
  return (
    <div className="bg-[#f8f9fa] relative rounded-[4px] shrink-0 w-full" data-name="Textarea">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[112px] pt-[16px] px-[16px] relative size-full">
          <Container37 />
        </div>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[11px] w-full">
        <p className="leading-[16.5px]">Minimum 200 characters for a verified profile badge.</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col gap-[8.5px] items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] tracking-[0.6px] uppercase w-[180.67px]">
        <p className="leading-[16px]">{`Service Philosophy & Bio`}</p>
      </div>
      <Textarea />
      <Container38 />
    </div>
  );
}

function SectionProfessionalBio() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Section: Professional Bio">
      <Heading3 />
      <Container36 />
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] text-center w-[70.13px]">
        <p className="leading-[20px]">Save Draft</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#c6d7fd] content-stretch flex flex-col items-center justify-center px-[32px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#4d5d7e] text-[16px] text-center w-[53.73px]">
        <p className="leading-[24px]">Cancel</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="relative shrink-0 size-[9.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
        <g id="Container">
          <path d={svgPaths.pce77c00} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#00346f] content-stretch flex gap-[7.99px] items-center px-[40px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-[0_0.3px_0_0] rounded-[4px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" data-name="Button:shadow" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white w-[182.86px]">
        <p className="leading-[24px]">Continue to Verification</p>
      </div>
      <Container40 />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex gap-[16.01px] items-center relative shrink-0" data-name="Container">
      <Button1 />
      <Button2 />
    </div>
  );
}

function FooterActions() {
  return (
    <div className="content-stretch flex items-center justify-between pt-[32px] relative shrink-0 w-full" data-name="Footer Actions">
      <Button />
      <Container39 />
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="Form">
      <SectionBusinessDetails />
      <SectionSpecialtySelectionPillStyle />
      <SectionProfessionalBio />
      <FooterActions />
    </div>
  );
}

function RightColumnFormCanvas() {
  return (
    <div className="bg-white col-[5/span_8] drop-shadow-[0px_20px_20px_rgba(25,28,29,0.04)] justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="Right Column: Form Canvas">
      <div className="content-stretch flex flex-col items-start pb-[64px] pt-[48px] px-[48px] relative size-full">
        <Form />
      </div>
    </div>
  );
}

function MainLayoutBentoAsymmetricStyle() {
  return (
    <div className="gap-x-[40px] gap-y-[40px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_848.50px] relative shrink-0 w-full" data-name="Main Layout: Bento/Asymmetric Style">
      <LeftColumnEditorialContentProgress />
      <RightColumnFormCanvas />
    </div>
  );
}

function Main() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Main">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] pb-[86.5px] pt-[96px] px-[24px] relative size-full">
        <MainLayoutBentoAsymmetricStyle />
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[20px] w-[143.52px]">
        <p className="leading-[28px]">OneStopShop</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[280.7px]">
        <p className="leading-[20px]">© 2024 OneStopShop. Built on Reliability.</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[280.7px]" data-name="Container">
      <Container43 />
      <Container44 />
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[112.77px]">
        <p className="leading-[20px]">Terms of Service</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[92.58px]">
        <p className="leading-[20px]">Privacy Policy</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[104.14px]">
        <p className="leading-[20px]">Cookie Settings</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[194.13px]">
        <p className="leading-[20px]">Contact Professional Support</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex gap-[32px] h-[20px] items-start justify-center relative shrink-0" data-name="Container">
      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex items-center justify-between max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Container42 />
      <Container45 />
    </div>
  );
}

function FooterSharedComponent() {
  return (
    <div className="bg-[#f8fafc] relative shrink-0 w-full" data-name="Footer (Shared Component)">
      <div className="content-stretch flex flex-col items-start px-[32px] py-[48px] relative size-full">
        <Container41 />
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[32px] justify-center leading-[0] relative shrink-0 text-[#1e3a8a] text-[24px] tracking-[-1.2px] w-[157.47px]">
        <p className="leading-[32px]">OneStopShop</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Manrope:Semi_Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[16px] tracking-[-0.4px] w-[93.2px]">
        <p className="leading-[24px]">How it Works</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Manrope:Semi_Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[16px] tracking-[-0.4px] w-[47.47px]">
        <p className="leading-[24px]">Safety</p>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Manrope:Semi_Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[16px] tracking-[-0.4px] w-[59.5px]">
        <p className="leading-[24px]">Support</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-name="Container">
      <Link4 />
      <Link5 />
      <Link6 />
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[20px] py-[8px] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#1e3a8a] text-[16px] text-center w-[42.78px]">
        <p className="leading-[24px]">Login</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#00346f] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center px-[20px] py-[8px] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white w-[60.19px]">
        <p className="leading-[24px]">Sign Up</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Button3 />
      <Button4 />
    </div>
  );
}

function Container46() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center max-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between max-w-[inherit] pl-[32px] pr-[32.01px] py-[16px] relative size-full">
          <Container47 />
          <Container48 />
          <Container49 />
        </div>
      </div>
    </div>
  );
}

function SuppressingActiveNavPerSuppressionLogicForTransactionalOnboardingPage() {
  return (
    <div className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col items-start left-0 shadow-[0px_20px_40px_0px_rgba(25,28,29,0.04)] top-0 w-[1280px]" data-name="Suppressing Active Nav per Suppression Logic for Transactional/Onboarding page">
      <Container46 />
    </div>
  );
}

export default function MechanicProfileSetup() {
  return (
    <div className="bg-[#f8f9fa] content-stretch flex flex-col items-start justify-between relative size-full" data-name="Mechanic Profile Setup">
      <Main />
      <FooterSharedComponent />
      <SuppressingActiveNavPerSuppressionLogicForTransactionalOnboardingPage />
    </div>
  );
}