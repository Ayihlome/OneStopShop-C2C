import svgPaths from "./svg-zgve3zi0w4";
import imgMechanicProfile from "./5e027ba885d250a35395500ca5bef88686f2dacb.png";

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[10px] tracking-[0.5px] uppercase w-full">
        <p className="leading-[15px]">Location</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#c2c6d3] text-[16px] w-full">
        <p className="leading-[normal]">Enter city or zip</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pl-[40px] pr-[16px] py-[14px] relative size-full">
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bottom-1/4 content-stretch flex flex-col items-start left-[12px] top-1/4" data-name="Container">
      <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
          <path d={svgPaths.p1869180} fill="var(--fill-0, #737783)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input />
      <Container3 />
    </div>
  );
}

function LocationFilter() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Location Filter">
      <Heading1 />
      <Container1 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[10px] tracking-[0.5px] uppercase w-full">
        <p className="leading-[15px]">Specialty</p>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.pf079980} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ImageFill() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="image fill">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Svg />
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#00346f] content-stretch flex flex-col items-start p-px relative rounded-[2px] shrink-0 size-[18px]" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <ImageFill />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#424751] text-[16px] w-[144.45px]">
        <p className="leading-[24px]">Engine Diagnostics</p>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex gap-[11px] items-center relative shrink-0 w-[257px]" data-name="Label">
      <Input1 />
      <Container5 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#424751] text-[16px] w-[126.39px]">
        <p className="leading-[24px]">{`Electric & Hybrid`}</p>
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Label">
      <div className="bg-white relative rounded-[2px] shrink-0 size-[16px]" data-name="Input">
        <div aria-hidden="true" className="absolute border border-[#c2c6d3] border-solid inset-0 pointer-events-none rounded-[2px]" />
      </div>
      <Container6 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#424751] text-[16px] w-[120.55px]">
        <p className="leading-[24px]">Brake Specialist</p>
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Label">
      <div className="bg-white relative rounded-[2px] shrink-0 size-[16px]" data-name="Input">
        <div aria-hidden="true" className="absolute border border-[#c2c6d3] border-solid inset-0 pointer-events-none rounded-[2px]" />
      </div>
      <Container7 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#424751] text-[16px] w-[175.83px]">
        <p className="leading-[24px]">Classic Car Restoration</p>
      </div>
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Label">
      <div className="bg-white relative rounded-[2px] shrink-0 size-[16px]" data-name="Input">
        <div aria-hidden="true" className="absolute border border-[#c2c6d3] border-solid inset-0 pointer-events-none rounded-[2px]" />
      </div>
      <Container8 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#424751] text-[16px] w-[161.73px]">
        <p className="leading-[24px]">Transmission Service</p>
      </div>
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Label">
      <div className="bg-white relative rounded-[2px] shrink-0 size-[16px]" data-name="Input">
        <div aria-hidden="true" className="absolute border border-[#c2c6d3] border-solid inset-0 pointer-events-none rounded-[2px]" />
      </div>
      <Container9 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-end relative shrink-0 w-full" data-name="Container">
      <Label />
      <Label1 />
      <Label2 />
      <Label3 />
      <Label4 />
    </div>
  );
}

function SpecialtyFilter() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Specialty Filter">
      <Heading2 />
      <Container4 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[10px] tracking-[0.5px] uppercase w-full">
        <p className="leading-[15px]">Years of Expertise</p>
      </div>
    </div>
  );
}

function Container12() {
  return <div className="flex-[1_0_0] h-[16px] min-w-px relative" data-name="Container" />;
}

function Container11() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 right-0 top-[-5px]" data-name="Container">
      <Container12 />
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-[#c2c6d3] h-[6px] relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <Container11 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] w-[34.11px]">
        <p className="leading-[18px]">1 Year</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] w-[58.75px]">
        <p className="leading-[18px]">20+ Years</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex h-[18px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Input2 />
      <Container13 />
    </div>
  );
}

function ExpertiseFilter() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Expertise Filter">
      <Heading3 />
      <Container10 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#c6d7fd] content-stretch flex items-center justify-center py-[12px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#4d5d7e] text-[16px] text-center w-[95.73px]">
        <p className="leading-[24px]">Reset Filters</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-full" data-name="Container">
      <LocationFilter />
      <SpecialtyFilter />
      <ExpertiseFilter />
      <Button />
    </div>
  );
}

function AsideSidebarFilterTheCuratedList() {
  return (
    <div className="bg-[#f3f4f5] content-stretch flex flex-col h-[1373px] items-start overflow-clip p-[32px] relative shrink-0 w-[320px]" data-name="Aside - Sidebar Filter (The Curated List)">
      <Container />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:Extra_Bold',sans-serif] h-[48px] justify-center leading-[0] not-italic relative shrink-0 text-[#1e3a8a] text-[48px] tracking-[-1.2px] w-[401.91px]">
        <p className="leading-[48px]">Expert Mechanics</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[48px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[16px] w-[360.48px]">
        <p className="leading-[24px] mb-0">Vetted professionals for your high-performance</p>
        <p className="leading-[24px]">vehicle.</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[401.91px]" data-name="Container">
      <Heading />
      <Container18 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[37.49px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[48px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[16px] w-[134.03px]">
        <p className="leading-[24px] mb-0">142 professionals</p>
        <p className="leading-[24px]">found</p>
      </div>
    </div>
  );
}

function Svg1() {
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

function ImageFill1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[40px] items-start justify-center left-0 overflow-clip pl-[160px] pr-[8px] py-[8px] top-0 w-[192px]" data-name="image fill">
      <Svg1 />
    </div>
  );
}

function Container20() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[12px] overflow-clip pr-[24.03px] top-1/2" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#00346f] text-[16px] w-[115.97px]">
        <p className="leading-[24px]">Top Rated First</p>
      </div>
    </div>
  );
}

function Options() {
  return (
    <div className="h-[40px] relative shrink-0 w-[192px]" data-name="Options">
      <ImageFill1 />
      <Container20 />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#e7e8e9] content-stretch flex gap-[16px] items-center px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Background">
      <Container19 />
      <div className="bg-[#c2c6d3] h-[16px] relative shrink-0 w-[0.94px]" data-name="Vertical Divider" />
      <Options />
    </div>
  );
}

function HeaderWithResultsInfo() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Header with Results Info">
      <Container17 />
      <Background />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#00346f] text-[16px] text-center w-[190.97px]">
        <p className="leading-[24px]">Load More Professionals</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[7.4px] relative shrink-0 w-[12px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7.4">
        <g id="Container">
          <path d={svgPaths.p1adfde00} fill="var(--fill-0, #00346F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#e7e8e9] content-stretch flex gap-[8px] items-center px-[32px] py-[16px] relative rounded-[9999px] shrink-0" data-name="Button">
      <Container21 />
      <Container22 />
    </div>
  );
}

function LoadMorePagination() {
  return (
    <div className="content-stretch flex items-start justify-center pt-[48px] relative shrink-0 w-full" data-name="Load More / Pagination">
      <Button1 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start max-w-[1152px] relative shrink-0 w-full" data-name="Container">
      <HeaderWithResultsInfo />
      <LoadMorePagination />
    </div>
  );
}

function MechanicProfile() {
  return (
    <div className="relative rounded-[9999px] shadow-[0px_0px_0px_2px_white,0px_0px_0px_4px_#f8f9fa] shrink-0 size-[80px]" data-name="Mechanic Profile">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgMechanicProfile} />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <MechanicProfile />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[20px] w-full">
        <p className="leading-[28px] mb-0">Jordan</p>
        <p className="leading-[28px]">McLoren</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] tracking-[0.7px] uppercase w-full">
        <p className="leading-[20px] mb-0">EV</p>
        <p className="leading-[20px]">Engineer</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[14.25px] relative shrink-0 w-[15px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 14.25">
        <g id="Container">
          <path d={svgPaths.p389def00} fill="var(--fill-0, #5F2200)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[14px] w-[22.13px]">
        <p className="leading-[20px]">4.9</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[4px] pr-[22.49px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[#737783] text-[12px] w-[48.04px]">
        <p className="leading-[16px] mb-0">(342</p>
        <p className="leading-[16px]">reviews)</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pt-[4px] relative shrink-0 w-full" data-name="Container">
      <Container28 />
      <Container29 />
      <Margin />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="Container">
      <Heading4 />
      <Container26 />
      <Container27 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Container24 />
      <Container25 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#edeeef] content-stretch flex flex-col h-[24.8px] items-start px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#424751] text-[11.2px] w-[67.42px]">
        <p className="leading-[16.8px]">V8 ENGINES</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#edeeef] content-stretch flex flex-col h-[24.8px] items-start px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#424751] text-[11.2px] w-[95.92px]">
        <p className="leading-[16.8px]">TURBO SYSTEMS</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Background1 />
      <Background2 />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#424751] text-[16px] w-full">
        <p className="leading-[24px] mb-0">{`"Expert in battery systems`}</p>
        <p className="leading-[24px]">and complex electrical…</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pb-[8px] relative shrink-0 w-full" data-name="Container">
      <Container31 />
      <Container32 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#00346f] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[24px] py-[12px] relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white w-[81.14px]">
          <p className="leading-[20px]">View Profile</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#edeeef] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pt-px relative size-full">
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function MechanicCard1() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_20px_20px_rgba(25,28,29,0.04)] flex flex-col gap-[24px] h-[470px] items-start left-[448px] p-[24px] right-[60px] rounded-[8px] top-[33px]" data-name="Mechanic Card 7">
      <Container23 />
      <Container30 />
      <HorizontalBorder />
    </div>
  );
}

function MechanicProfile1() {
  return (
    <div className="relative rounded-[9999px] shadow-[0px_0px_0px_2px_white,0px_0px_0px_4px_#f8f9fa] shrink-0 size-[80px]" data-name="Mechanic Profile">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgMechanicProfile} />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <MechanicProfile1 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[20px] w-full">
        <p className="leading-[28px] mb-0">John</p>
        <p className="leading-[28px]">Doe</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] tracking-[0.7px] uppercase w-full">
        <p className="leading-[20px] mb-0">Engine</p>
        <p className="leading-[20px]">Master</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[14.25px] relative shrink-0 w-[15px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 14.25">
        <g id="Container">
          <path d={svgPaths.p389def00} fill="var(--fill-0, #5F2200)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[14px] w-[22.13px]">
        <p className="leading-[20px]">4.9</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[4px] pr-[22.49px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[#737783] text-[12px] w-[48.04px]">
        <p className="leading-[16px] mb-0">(342</p>
        <p className="leading-[16px]">reviews)</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pt-[4px] relative shrink-0 w-full" data-name="Container">
      <Container38 />
      <Container39 />
      <Margin1 />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="Container">
      <Heading5 />
      <Container36 />
      <Container37 />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Container34 />
      <Container35 />
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#edeeef] content-stretch flex flex-col h-[24.8px] items-start px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#424751] text-[11.2px] w-[67.42px]">
        <p className="leading-[16.8px]">V8 ENGINES</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#edeeef] content-stretch flex flex-col h-[24.8px] items-start px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#424751] text-[11.2px] w-[95.92px]">
        <p className="leading-[16.8px]">TURBO SYSTEMS</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Background3 />
      <Background4 />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#424751] text-[16px] w-full">
        <p className="leading-[24px] mb-0">{`"15 years of precision tuning`}</p>
        <p className="leading-[24px]">for performance European…</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pb-[8px] relative shrink-0 w-full" data-name="Container">
      <Container41 />
      <Container42 />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#00346f] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[24px] py-[12px] relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white w-[81.14px]">
          <p className="leading-[20px]">View Profile</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#edeeef] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pt-px relative size-full">
          <Button3 />
        </div>
      </div>
    </div>
  );
}

function MechanicCard() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_20px_20px_rgba(25,28,29,0.04)] flex flex-col gap-[24px] h-[470px] items-start left-[52px] p-[24px] right-[456px] rounded-[8px] top-[33px]" data-name="Mechanic Card 6">
      <Container33 />
      <Container40 />
      <HorizontalBorder1 />
    </div>
  );
}

function MechanicProfile2() {
  return (
    <div className="relative rounded-[9999px] shadow-[0px_0px_0px_2px_white,0px_0px_0px_4px_#f8f9fa] shrink-0 size-[80px]" data-name="Mechanic Profile">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgMechanicProfile} />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <MechanicProfile2 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[20px] w-full">
        <p className="leading-[28px] mb-0">Robert</p>
        <p className="leading-[28px]">Glass</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] tracking-[0.7px] uppercase w-full">
        <p className="leading-[20px] mb-0">transmission</p>
        <p className="leading-[20px]">engineer</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[14.25px] relative shrink-0 w-[15px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 14.25">
        <g id="Container">
          <path d={svgPaths.p389def00} fill="var(--fill-0, #5F2200)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[14px] w-[22.13px]">
        <p className="leading-[20px]">4.9</p>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[4px] pr-[22.49px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[#737783] text-[12px] w-[48.04px]">
        <p className="leading-[16px] mb-0">(342</p>
        <p className="leading-[16px]">reviews)</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pt-[4px] relative shrink-0 w-full" data-name="Container">
      <Container48 />
      <Container49 />
      <Margin2 />
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="Container">
      <Heading6 />
      <Container46 />
      <Container47 />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Container44 />
      <Container45 />
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#edeeef] content-stretch flex flex-col h-[24.8px] items-start px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#424751] text-[11.2px] w-[67.42px]">
        <p className="leading-[16.8px]">V8 ENGINES</p>
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#edeeef] content-stretch flex flex-col h-[24.8px] items-start px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#424751] text-[11.2px] w-[95.92px]">
        <p className="leading-[16.8px]">TURBO SYSTEMS</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Background5 />
      <Background6 />
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#424751] text-[16px] w-full">
        <p className="leading-[24px] mb-0">{`"Specialized in modern`}</p>
        <p className="leading-[24px]">{`dual-clutch and automatic… `}</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pb-[8px] relative shrink-0 w-full" data-name="Container">
      <Container51 />
      <Container52 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#00346f] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[24px] py-[12px] relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white w-[81.14px]">
          <p className="leading-[20px]">View Profile</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder2() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#edeeef] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pt-px relative size-full">
          <Button4 />
        </div>
      </div>
    </div>
  );
}

function MechanicCard2() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_20px_20px_rgba(25,28,29,0.04)] flex flex-col gap-[24px] h-[470px] items-start left-[61px] p-[24px] right-[447px] rounded-[8px] top-[544px]" data-name="Mechanic Card 8">
      <Container43 />
      <Container50 />
      <HorizontalBorder2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[1047px] overflow-clip relative shrink-0 w-[864px]">
      <MechanicCard1 />
      <MechanicCard />
      <MechanicCard2 />
    </div>
  );
}

function SectionMainContentArea() {
  return (
    <div className="flex-[1_0_0] min-w-px relative self-stretch" data-name="Section - Main Content Area">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[48px] relative size-full">
          <Container16 />
          <Frame />
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="content-stretch flex items-start min-h-[1453px] pt-[80px] relative shrink-0 w-full" data-name="Main">
      <AsideSidebarFilterTheCuratedList />
      <SectionMainContentArea />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col gap-[8.5px] items-start leading-[0] not-italic relative shrink-0" data-name="Paragraph">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[28px] justify-center relative shrink-0 text-[#0f172a] text-[18px] w-[129.17px]">
        <p className="leading-[28px]">OneStopShop</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center relative shrink-0 text-[#64748b] text-[14px] w-[362.94px]">
        <p className="leading-[20px]">© 2024 OneStopShop Framework. All rights reserved.</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-80 relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[16px] w-[128.86px]">
        <p className="leading-[24px]">Terms of Service</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-80 relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[16px] w-[105.8px]">
        <p className="leading-[24px]">Privacy Policy</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-80 relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[16px] w-[119.02px]">
        <p className="leading-[24px]">Cookie Settings</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-80 relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[16px] w-[106.47px]">
        <p className="leading-[24px]">{`Trust & Safety`}</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex gap-[32px] h-[24px] items-start justify-center relative shrink-0" data-name="Container">
      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
    </div>
  );
}

function Container53() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center max-w-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between max-w-[inherit] px-[32px] py-[48px] relative size-full">
          <Paragraph />
          <Container54 />
        </div>
      </div>
    </div>
  );
}

function FooterSection() {
  return (
    <div className="bg-[#f8fafc] content-stretch flex flex-col items-start pt-px relative shrink-0 w-full" data-name="Footer Section">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-solid border-t inset-0 pointer-events-none" />
      <Container53 />
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Epilogue:SemiBold',sans-serif] font-semibold h-[32px] justify-center leading-[0] relative shrink-0 text-[#1e3a8a] text-[24px] tracking-[-0.6px] w-[164.42px]">
        <p className="leading-[32px]">OneStopShop</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[6px] relative shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#1e3a8a] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#1e3a8a] text-[16px] w-[122.02px]">
        <p className="leading-[24px]">Find Mechanics</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[16px] w-[65.66px]">
        <p className="leading-[24px]">Services</p>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[16px] w-[100.45px]">
        <p className="leading-[24px]">How it Works</p>
      </div>
    </div>
  );
}

function Link7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[16px] w-[60.42px]">
        <p className="leading-[24px]">Support</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-name="Container">
      <Link4 />
      <Link5 />
      <Link6 />
      <Link7 />
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex gap-[48px] items-center relative shrink-0" data-name="Container">
      <Container56 />
      <Container57 />
    </div>
  );
}

function Button5() {
  return <div className="h-[40px] relative rounded-[4px] shrink-0 w-[100.64px]" data-name="Button" />;
}

function Button6() {
  return (
    <div className="bg-[#00346f] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white w-[85.11px]">
        <p className="leading-[24px]">Log out</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Button5 />
      <Button6 />
    </div>
  );
}

function Nav() {
  return (
    <div className="h-[80px] relative shrink-0 w-full" data-name="Nav">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[32px] relative size-full">
          <Container55 />
          <Container58 />
        </div>
      </div>
    </div>
  );
}

function HeaderTopNavigationBar() {
  return (
    <div className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col items-start left-0 shadow-[0px_20px_40px_0px_rgba(25,28,29,0.04)] top-0 w-[1280px]" data-name="Header - Top Navigation Bar">
      <Nav />
    </div>
  );
}

export default function FindYourMechanic() {
  return (
    <div className="bg-[#f8f9fa] content-stretch flex flex-col items-start relative size-full" data-name="Find Your Mechanic">
      <Main />
      <FooterSection />
      <HeaderTopNavigationBar />
    </div>
  );
}