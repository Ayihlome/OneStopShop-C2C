import svgPaths from "./svg-xmk6g9x081";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:Extra_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00346f] text-[48px] tracking-[-1.2px] w-full">
        <p className="leading-[60px] mb-0">Join the league of</p>
        <p className="leading-[60px]">reliable drivers.</p>
      </div>
    </div>
  );
}

function Heading1Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[24px] relative shrink-0 w-full" data-name="Heading 1:margin">
      <Heading />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[448px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[18px] w-full">
        <p className="leading-[28px] mb-0">Set up your professional profile to start connecting</p>
        <p className="leading-[28px] mb-0">with trusted mechanics and maintaining your</p>
        <p className="leading-[28px]">{`vehicle's health record.`}</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[448px] pb-[40px] relative shrink-0 w-[448px]" data-name="Margin">
      <Container1 />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#00346f] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[40px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white w-[6.77px]">
        <p className="leading-[24px]">1</p>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[#00346f] text-[18px] w-[148.58px]">
        <p className="leading-[28px]">Personal Identity</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] w-[322.14px]">
        <p className="leading-[20px]">How mechanics and the community will see you.</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[322.14px]" data-name="Container">
      <Heading2 />
      <Container5 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Background />
      <Container4 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#e1e3e4] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[40px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[16px] text-center w-[10.19px]">
        <p className="leading-[24px]">2</p>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[#4e5f7f] text-[18px] w-[101.45px]">
        <p className="leading-[28px]">Verification</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] w-[287.34px]">
        <p className="leading-[20px]">Confirming your identity for the ecosystem.</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[287.34px]" data-name="Container">
      <Heading3 />
      <Container8 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[16px] items-start opacity-40 relative shrink-0 w-full" data-name="Container">
      <Background1 />
      <Container7 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Container6 />
    </div>
  );
}

function LeftColumnEditorialContentProgress() {
  return (
    <div className="col-[1/span_5] content-stretch flex flex-col items-start justify-center justify-self-stretch py-[275.5px] relative row-1 self-start shrink-0" data-name="Left Column: Editorial Content & Progress">
      <Heading1Margin />
      <Margin />
      <Container2 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#00346f] text-[20px] w-full">
        <p className="leading-[28px]">Profile Photo</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Container">
          <path d={svgPaths.p348ddf00} fill="var(--fill-0, #737783)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#e7e8e9] relative rounded-[12px] shrink-0 size-[128px]" data-name="Background+Border">
      <div className="content-stretch flex items-center justify-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <Container11 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#f8f9fa] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[11.667px] relative shrink-0 w-[12.833px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.8333 11.6667">
        <g id="Container">
          <path d={svgPaths.p3a06d3e0} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#00346f] bottom-0 content-stretch flex items-center justify-center right-0 rounded-[12px] size-[40px]" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 right-0 rounded-[12px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[40px]" data-name="Button:shadow" />
      <Container12 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <BackgroundBorder />
      <Button />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[14px] w-[187.89px]">
        <p className="leading-[20px]">Upload a professional photo</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[39px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] w-[317.56px]">
        <p className="leading-[19.5px] mb-0">Mechanics prefer working with drivers who have a clear</p>
        <p className="leading-[19.5px]">profile photo. JPG or PNG, max 5MB.</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start max-w-[320px] relative shrink-0 w-[317.56px]" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container13 />
    </div>
  );
}

function SectionProfilePhoto() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Section: Profile Photo">
      <Heading1 />
      <Container9 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#00346f] text-[20px] w-full">
        <p className="leading-[28px]">Basic Information</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737783] text-[16px] w-full">
        <p className="leading-[normal]">John</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f3f4f5] relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[16px] py-[18px] relative size-full">
          <Container18 />
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[8.5px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] tracking-[1.2px] uppercase w-[85.06px]">
        <p className="leading-[16px]">First Name</p>
      </div>
      <Input />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737783] text-[16px] w-full">
        <p className="leading-[normal]">Doe</p>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#f3f4f5] relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[16px] py-[18px] relative size-full">
          <Container20 />
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[8.5px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] tracking-[1.2px] uppercase w-[81.05px]">
        <p className="leading-[16px]">Last Name</p>
      </div>
      <Input1 />
    </div>
  );
}

function Container16() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_80px] relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container19 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737783] text-[16px] w-full">
        <p className="leading-[normal]">JohnDoe48@gmail.com</p>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-[#f3f4f5] relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[16px] py-[18px] relative size-full">
          <Container23 />
        </div>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="col-[1/span_2] content-stretch flex flex-col gap-[8.5px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] tracking-[1.2px] uppercase w-[85.06px]">
        <p className="leading-[16px]">Email</p>
      </div>
      <Input2 />
    </div>
  );
}

function Container21() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_80px] relative shrink-0 w-full" data-name="Container">
      <Container22 />
    </div>
  );
}

function SectionPersonalInformation() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[232px] items-start relative shrink-0 w-full" data-name="Section: Personal Information">
      <Heading4 />
      <Container16 />
      <Container21 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#00346f] text-[20px] w-full">
        <p className="leading-[28px]">Vehicle Details</p>
      </div>
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
    <div className="absolute content-stretch flex flex-col h-[56px] items-start justify-center left-0 overflow-clip pl-[149.77px] pr-[8px] py-[16px] top-0 w-[181.77px]" data-name="image fill">
      <Svg />
    </div>
  );
}

function Container26() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[16px] overflow-clip right-[16.01px] top-1/2" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[16px] w-[39.7px]">
        <p className="leading-[24px]">2024</p>
      </div>
    </div>
  );
}

function Options() {
  return (
    <div className="bg-[#f3f4f5] h-[56px] relative rounded-[4px] shrink-0 w-full" data-name="Options">
      <ImageFill />
      <Container26 />
    </div>
  );
}

function Container25() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[8.5px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] tracking-[1.2px] uppercase w-[37.19px]">
        <p className="leading-[16px]">Year</p>
      </div>
      <Options />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737783] text-[16px] w-full">
        <p className="leading-[normal]">e.g. BMW, Toyota</p>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-[#f3f4f5] relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[16px] py-[18px] relative size-full">
          <Container28 />
        </div>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="col-[2/span_2] content-stretch flex flex-col gap-[8.5px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] tracking-[1.2px] uppercase w-[40.31px]">
        <p className="leading-[16px]">Make</p>
      </div>
      <Input3 />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737783] text-[16px] w-full">
        <p className="leading-[normal]">e.g. X5, Camry</p>
      </div>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-[#f3f4f5] relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[16px] py-[18px] relative size-full">
          <Container30 />
        </div>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="col-[1/span_3] content-stretch flex flex-col gap-[8.5px] items-start justify-self-stretch relative row-2 self-start shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] tracking-[1.2px] uppercase w-[49.02px]">
        <p className="leading-[16px]">Model</p>
      </div>
      <Input4 />
    </div>
  );
}

function Container24() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[__80px_80px] relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <Container27 />
      <Container29 />
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[16px] relative shrink-0 w-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16">
        <g id="Container">
          <path d={svgPaths.p2d32e900} fill="var(--fill-0, #004A99)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#e1e3e4] content-stretch flex h-[56px] items-center justify-center relative rounded-[4px] shrink-0 w-[80px]" data-name="Background">
      <Container31 />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#00346f] text-[14px] w-[127.63px]">
        <p className="leading-[20px]">Why we need this?</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[39px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] w-[430.64px]">
        <p className="leading-[19.5px] mb-0">This data allows us to curate specialized mechanics who are experts in your</p>
        <p className="leading-[19.5px]">{`specific vehicle's engineering.`}</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[430.64px]" data-name="Container">
      <Container33 />
      <Container34 />
    </div>
  );
}

function VisualPromptCard() {
  return (
    <div className="bg-[rgba(215,226,255,0.1)] relative rounded-[8px] shrink-0 w-full" data-name="Visual Prompt Card">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[24px] items-center pb-[24px] pt-[32px] px-[24px] relative size-full">
          <Background2 />
          <Container32 />
        </div>
      </div>
    </div>
  );
}

function SectionVehicleDetailsArchitecturalBentoIshLayout() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Section: Vehicle Details (Architectural Bento-ish layout)">
      <Heading5 />
      <Container24 />
      <VisualPromptCard />
    </div>
  );
}

function Container35() {
  return (
    <div className="relative shrink-0 size-[9.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
        <g id="Container">
          <path d={svgPaths.p306f9a98} fill="var(--fill-0, #4E5F7F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex gap-[7.99px] items-center relative shrink-0" data-name="Button">
      <Container35 />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[16px] text-center w-[38.17px]">
        <p className="leading-[24px]">Back</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Container">
          <path d={svgPaths.p304eaa0} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#00346f] content-stretch flex gap-[12px] items-center px-[40px] py-[16px] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[4px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" data-name="Button:shadow" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white w-[119.53px]">
        <p className="leading-[24px]">Continue Setup</p>
      </div>
      <Container36 />
    </div>
  );
}

function ActionBar() {
  return (
    <div className="relative shrink-0 w-full" data-name="Action Bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[0.01px] pt-[24px] relative size-full">
          <Button1 />
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-full" data-name="Form">
      <SectionProfilePhoto />
      <SectionPersonalInformation />
      <SectionVehicleDetailsArchitecturalBentoIshLayout />
      <ActionBar />
    </div>
  );
}

function RightColumnFormCanvas() {
  return (
    <div className="bg-white col-[6/span_7] justify-self-stretch relative rounded-[8px] row-1 self-start shadow-[0px_20px_40px_0px_rgba(25,28,29,0.04)] shrink-0" data-name="Right Column: Form Canvas">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[64px] pt-[48px] px-[48px] relative size-full">
          <div className="absolute bg-[rgba(215,226,255,0.2)] blur-[32px] right-[-127.99px] rounded-[12px] size-[256px] top-[-128px]" data-name="Subtle Tonal Gradient Background" />
          <Form />
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="gap-x-[48px] gap-y-[48px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_1027px] max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <LeftColumnEditorialContentProgress />
      <RightColumnFormCanvas />
    </div>
  );
}

function Main() {
  return (
    <div className="relative shrink-0 w-full" data-name="Main">
      <div className="content-stretch flex flex-col items-start pb-[88px] pt-[128px] px-[32px] relative size-full">
        <Container />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[100.47px]">
        <p className="leading-[20px]">OneStopShop</p>
      </div>
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

function Container39() {
  return (
    <div className="content-stretch flex gap-[32px] h-[20px] items-start justify-center relative shrink-0" data-name="Container">
      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[280.7px]">
        <p className="leading-[20px]">© 2024 OneStopShop. Built on Reliability.</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex items-center justify-between max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Container38 />
      <Container39 />
      <Container40 />
    </div>
  );
}

function FooterSharedComponent() {
  return (
    <div className="bg-[#f8fafc] relative shrink-0 w-full" data-name="Footer (Shared Component)">
      <div className="content-stretch flex flex-col items-start px-[32px] py-[48px] relative size-full">
        <Container37 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[#1e3a8a] text-[24px] tracking-[-1.2px] w-[156.63px]">
        <p className="leading-[32px]">OneStopShop</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[14px] tracking-[-0.4px] w-[155px]">
        <p className="leading-[20px]">Step 1 of 3: Profile Setup</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[16px] text-center w-[84.5px]">
        <p className="leading-[24px]">{`Save & Exit`}</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Button3 />
    </div>
  );
}

function Container41() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center max-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between max-w-[inherit] px-[32px] py-[24px] relative size-full">
          <Container42 />
          <Container43 />
          <Container44 />
        </div>
      </div>
    </div>
  );
}

function HeaderNavigationSuppressedForOnboardingTransactionalFlowAsPerShellVisibilityRelevanceRule() {
  return (
    <div className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col items-start left-0 top-0 w-[1280px]" data-name="Header - Navigation suppressed for Onboarding/Transactional flow as per 'Shell Visibility & Relevance' rule">
      <Container41 />
    </div>
  );
}

export default function DriverProfileSetup() {
  return (
    <div className="bg-[#f8f9fa] content-stretch flex flex-col items-start justify-between relative size-full" data-name="Driver Profile Setup">
      <Main />
      <FooterSharedComponent />
      <HeaderNavigationSuppressedForOnboardingTransactionalFlowAsPerShellVisibilityRelevanceRule />
    </div>
  );
}