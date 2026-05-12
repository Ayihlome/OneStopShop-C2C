import svgPaths from "./svg-c6zuumo4b1";
import imgUserProfile from "./79b07df3ca095ff10ba09d92cd8f791611284e75.png";
import imgUserProfile1 from "./edbcfd7abbe5165b011ebe7881bb5e2bc036e890.png";
import imgUserProfile2 from "./9de075203cb5f7aa74d5de12f6d0e5993c44b606.png";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Epilogue:ExtraBold',sans-serif] font-extrabold justify-center leading-[0] relative shrink-0 text-[#1e3a8a] text-[20px] w-full">
        <p className="leading-[28px]">OneStopShop</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[10px] tracking-[0.5px] uppercase w-full">
        <p className="leading-[15px]">Admin Portal</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[4px] items-start px-[8px] relative size-full">
        <Heading />
        <Container1 />
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[40px] relative size-full">
        <Container />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Container">
          <path d={svgPaths.p498ff00} fill="var(--fill-0, #1E3A8A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#1e3a8a] text-[12px] tracking-[0.6px] uppercase w-[80.84px]">
          <p className="leading-[16px]">Dashboard</p>
        </div>
      </div>
    </div>
  );
}

function LinkActiveItemDashboard() {
  return (
    <div className="bg-[#eff6ff] relative shrink-0 w-full" data-name="Link - Active Item: Dashboard">
      <div aria-hidden="true" className="absolute border-[#1e3a8a] border-r-4 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] pr-[16px] py-[10px] relative size-full">
          <Container2 />
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 size-[16.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
        <g id="Container">
          <path d={svgPaths.p3ed97940} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[0.6px] uppercase w-[70.94px]">
        <p className="leading-[16px]">Messages</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative size-full">
          <Container4 />
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[13.333px] relative shrink-0 w-[18.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 13.3333">
        <g id="Container">
          <path d={svgPaths.pc297b80} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[0.6px] uppercase w-[66.97px]">
        <p className="leading-[16px]">Earnings</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative size-full">
          <Container6 />
          <Container7 />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[16.667px] relative shrink-0 w-[16.75px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.75 16.6667">
        <g id="Container">
          <path d={svgPaths.p18e22d80} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[0.6px] uppercase w-[64.95px]">
        <p className="leading-[16px]">Settings</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative size-full">
          <Container8 />
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Nav">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <LinkActiveItemDashboard />
        <Link />
        <Link1 />
        <Link2 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0 size-[16.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
        <g id="Container">
          <path d={svgPaths.p16f8b100} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[0.6px] uppercase w-[88.61px]">
        <p className="leading-[16px]">Help Center</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative size-full">
          <Container10 />
          <Container11 />
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Container">
          <path d={svgPaths.p2b55a3c0} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[0.6px] uppercase w-[54.23px]">
        <p className="leading-[16px]">Logout</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative size-full">
          <Container12 />
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start pt-[25px] relative size-full">
        <Link3 />
        <Link4 />
      </div>
    </div>
  );
}

function AsideSideNavBarComponent() {
  return (
    <div className="bg-[#f8fafc] content-stretch flex flex-col h-[1178px] items-start justify-between pl-[16px] pr-[17px] py-[24px] relative shrink-0 w-[256px]" data-name="Aside - SideNavBar Component">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-r border-solid inset-0 pointer-events-none" />
      <Margin />
      <Nav />
      <HorizontalBorder />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Manrope:Extra_Bold',sans-serif] h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#00346f] text-[30px] tracking-[-0.75px] w-[259.84px]">
        <p className="leading-[36px]">Platform Overview</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[16px] w-[465.47px]">
        <p className="leading-[24px]">{`Good morning, Administrator. Here's what's happening today.`}</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[465.47px]" data-name="Container">
      <Heading1 />
      <Container15 />
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Container">
          <path d={svgPaths.p38806900} fill="var(--fill-0, #4D5D7E)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#c6d7fd] content-stretch flex gap-[8px] items-center px-[20px] py-[10px] relative rounded-[4px] shrink-0" data-name="Button">
      <Container17 />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#4d5d7e] text-[14px] text-center w-[79.19px]">
        <p className="leading-[20px]">Export Data</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="relative shrink-0 size-[10.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g id="Container">
          <path d={svgPaths.p38ac19c0} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#00346f] content-stretch drop-shadow-[0px_4px_6px_rgba(0,52,111,0.2)] flex gap-[8px] items-center px-[20px] py-[10px] relative rounded-[4px] shrink-0" data-name="Button">
      <Container18 />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white w-[79.23px]">
        <p className="leading-[20px]">New Report</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function HeaderSection() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Header Section">
      <Container14 />
      <Container16 />
    </div>
  );
}

function Background() {
  return (
    <div className="h-[31px] relative shrink-0 w-[38px]" data-name="Background">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 31">
        <g id="Background">
          <rect fill="var(--fill-0, #EFF6FF)" height="31" rx="4" width="38" />
          <path d={svgPaths.p289404c0} fill="var(--fill-0, #00346F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#f0fdf4] content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[12px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#16a34a] text-[12px] w-[43.75px]">
        <p className="leading-[16px]">+12.5%</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Background />
      <Background1 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full" data-name="Margin">
      <Container19 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] tracking-[0.6px] uppercase w-full">
        <p className="leading-[16px]">Total Site Visits</p>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Extra_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[24px] w-full">
        <p className="leading-[32px]">1.2M</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <Heading2 />
    </div>
  );
}

function MetricCard() {
  return (
    <div className="bg-white col-1 drop-shadow-[0px_20px_20px_rgba(25,28,29,0.04)] justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="Metric Card 1">
      <div className="content-stretch flex flex-col items-start justify-between p-[24px] relative size-full">
        <Margin1 />
        <Container20 />
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="h-[32px] relative shrink-0 w-[40px]" data-name="Background">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 32">
        <g id="Background">
          <rect fill="var(--fill-0, #EFF6FF)" height="32" rx="4" width="40" />
          <path d={svgPaths.p349100} fill="var(--fill-0, #00346F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#f0fdf4] content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[12px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#16a34a] text-[12px] w-[38.86px]">
        <p className="leading-[16px]">+8.2%</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Background2 />
      <Background3 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full" data-name="Margin">
      <Container22 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] tracking-[0.6px] uppercase w-full">
        <p className="leading-[16px]">User Growth</p>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Extra_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[24px] w-full">
        <p className="leading-[32px]">45,820</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Container24 />
      <Heading3 />
    </div>
  );
}

function MetricCard1() {
  return (
    <div className="bg-white col-2 drop-shadow-[0px_20px_20px_rgba(25,28,29,0.04)] justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="Metric Card 2">
      <div className="content-stretch flex flex-col items-start justify-between p-[24px] relative size-full">
        <Margin2 />
        <Container23 />
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="h-[35px] relative shrink-0 w-[36px]" data-name="Background">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 35">
        <g id="Background">
          <rect fill="var(--fill-0, #EFF6FF)" height="35" rx="4" width="36" />
          <path d={svgPaths.p16bc4c00} fill="var(--fill-0, #00346F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#eff6ff] content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[12px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#2563eb] text-[12px] w-[36.72px]">
        <p className="leading-[16px]">Stable</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between relative size-full">
        <Background4 />
        <Background5 />
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full" data-name="Margin">
      <Container25 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] tracking-[0.6px] uppercase w-full">
        <p className="leading-[16px]">Mechanic Rating</p>
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Extra_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[24px] w-full">
        <p className="leading-[32px]">4.82</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Container27 />
      <Heading4 />
    </div>
  );
}

function MetricCard2() {
  return (
    <div className="bg-white col-3 drop-shadow-[0px_20px_20px_rgba(25,28,29,0.04)] justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="Metric Card 3">
      <div className="content-stretch flex flex-col items-start justify-between p-[24px] relative size-full">
        <Margin3 />
        <Container26 />
      </div>
    </div>
  );
}

function Overlay() {
  return (
    <div className="relative shrink-0 size-[34px]" data-name="Overlay">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
        <g id="Overlay">
          <rect fill="var(--fill-0, #833301)" fillOpacity="0.1" height="34" rx="4" width="34" />
          <path d={svgPaths.p99f1d80} fill="var(--fill-0, #5F2200)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#ffdbcc] content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[12px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#5f2200] text-[12px] w-[36.77px]">
        <p className="leading-[16px]">3 New</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Overlay />
      <Background6 />
    </div>
  );
}

function Margin4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[16px] relative size-full">
        <Container28 />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] tracking-[0.6px] uppercase w-full">
        <p className="leading-[16px]">Pending Reports</p>
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Extra_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[24px] w-full">
        <p className="leading-[32px]">14</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container30 />
        <Heading5 />
      </div>
    </div>
  );
}

function MetricCard3() {
  return (
    <div className="bg-white col-4 drop-shadow-[0px_20px_20px_rgba(25,28,29,0.04)] justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="Metric Card 4">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col items-start justify-between p-[26px] relative size-full">
        <Margin4 />
        <Container29 />
      </div>
    </div>
  );
}

function SectionBentoGridMetrics() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[_160px] relative shrink-0 w-full" data-name="Section - Bento Grid Metrics">
      <MetricCard />
      <MetricCard1 />
      <MetricCard2 />
      <MetricCard3 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#00346f] text-[18px] w-[230.7px]">
        <p className="leading-[28px]">Service Volume Over Time</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] w-[103.19px]">
        <p className="leading-[16px]">Monthly Requests</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#00346f] relative rounded-[12px] shrink-0 size-[12px]" data-name="Background" />
      <Container33 />
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[32px] right-[32px] top-[32px]" data-name="Container">
      <Heading6 />
      <Container32 />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#c2c6d3] text-[10px] uppercase w-[20.47px]">
        <p className="leading-[15px]">Jan</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#c2c6d3] text-[10px] uppercase w-[18.53px]">
        <p className="leading-[15px]">Feb</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#c2c6d3] text-[10px] uppercase w-[23.03px]">
        <p className="leading-[15px]">Mar</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#c2c6d3] text-[10px] uppercase w-[20.25px]">
        <p className="leading-[15px]">Apr</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[10px] uppercase w-[22.88px]">
        <p className="[text-decoration-skip-ink:none] decoration-[#00346f] decoration-solid leading-[15px] underline">May</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#c2c6d3] text-[10px] uppercase w-[20.75px]">
        <p className="leading-[15px]">Jun</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#c2c6d3] text-[10px] uppercase w-[18.81px]">
        <p className="leading-[15px]">Jul</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute content-stretch flex h-[15px] items-start justify-between left-[32px] pl-[8px] pr-[8.03px] right-[32px] top-[364px]" data-name="Container">
      <Container35 />
      <Container36 />
      <Container37 />
      <Container38 />
      <Container39 />
      <Container40 />
      <Container41 />
    </div>
  );
}

function Background8() {
  return (
    <div className="absolute bg-[#191c1d] content-stretch flex flex-col items-start left-[25.68%] opacity-0 px-[8px] py-[4px] right-[25.71%] rounded-[2px] top-[-32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white w-[15.66px]">
        <p className="leading-[15px]">12k</p>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#eff6ff] flex-[1_0_0] h-[102.39px] min-w-px relative rounded-tl-[4px] rounded-tr-[4px]" data-name="Background">
      <Background8 />
    </div>
  );
}

function Background10() {
  return (
    <div className="absolute bg-[#191c1d] content-stretch flex flex-col items-start left-[25.62%] opacity-0 px-[8px] py-[4px] right-[25.64%] rounded-[2px] top-[-32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white w-[15.75px]">
        <p className="leading-[15px]">18k</p>
      </div>
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-[#eff6ff] flex-[1_0_0] h-[153.59px] min-w-px relative rounded-tl-[4px] rounded-tr-[4px]" data-name="Background">
      <Background10 />
    </div>
  );
}

function Background12() {
  return (
    <div className="absolute bg-[#191c1d] content-stretch flex flex-col items-start left-[25.61%] opacity-0 px-[8px] py-[4px] right-[25.62%] rounded-[2px] top-[-32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white w-[15.77px]">
        <p className="leading-[15px]">16k</p>
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-[#dbeafe] flex-[1_0_0] h-[140.8px] min-w-px relative rounded-tl-[4px] rounded-tr-[4px]" data-name="Background">
      <Background12 />
    </div>
  );
}

function Background14() {
  return (
    <div className="absolute bg-[#191c1d] content-stretch flex flex-col items-start left-[24.13%] opacity-0 px-[8px] py-[4px] right-[24.15%] rounded-[2px] top-[-32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white w-[17.69px]">
        <p className="leading-[15px]">22k</p>
      </div>
    </div>
  );
}

function Background13() {
  return (
    <div className="bg-[#eff6ff] flex-[1_0_0] h-[192px] min-w-px relative rounded-tl-[4px] rounded-tr-[4px]" data-name="Background">
      <Background14 />
    </div>
  );
}

function Background16() {
  return (
    <div className="absolute bg-[#191c1d] content-stretch flex flex-col items-start left-[24.06%] opacity-0 px-[8px] py-[4px] right-[24.09%] rounded-[2px] top-[-32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white w-[17.79px]">
        <p className="leading-[15px]">28k</p>
      </div>
    </div>
  );
}

function Background15() {
  return (
    <div className="bg-[#00346f] flex-[1_0_0] h-[230.39px] min-w-px relative rounded-tl-[4px] rounded-tr-[4px]" data-name="Background">
      <Background16 />
    </div>
  );
}

function Background18() {
  return (
    <div className="absolute bg-[#191c1d] content-stretch flex flex-col items-start left-[24.06%] opacity-0 px-[8px] py-[4px] right-[24.06%] rounded-[2px] top-[-32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white w-[17.79px]">
        <p className="leading-[15px]">26k</p>
      </div>
    </div>
  );
}

function Background17() {
  return (
    <div className="bg-[#bfdbfe] flex-[1_0_0] h-[217.59px] min-w-px relative rounded-tl-[4px] rounded-tr-[4px]" data-name="Background">
      <Background18 />
    </div>
  );
}

function Background20() {
  return (
    <div className="absolute bg-[#191c1d] content-stretch flex flex-col items-start left-[25.7%] opacity-0 px-[8px] py-[4px] right-[25.7%] rounded-[2px] top-[-32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white w-[15.65px]">
        <p className="leading-[15px]">21k</p>
      </div>
    </div>
  );
}

function Background19() {
  return (
    <div className="bg-[#eff6ff] flex-[1_0_0] h-[179.19px] min-w-px relative rounded-tl-[4px] rounded-tr-[4px]" data-name="Background">
      <Background20 />
    </div>
  );
}

function SimulatedChartUi() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[256px] items-end justify-center left-[32px] px-[8px] right-[32px] top-[92px]" data-name="Simulated Chart UI">
      <Background7 />
      <Background9 />
      <Background11 />
      <Background13 />
      <Background15 />
      <Background17 />
      <Background19 />
    </div>
  );
}

function MainChartArea() {
  return (
    <div className="bg-white col-[1/span_2] drop-shadow-[0px_20px_20px_rgba(25,28,29,0.04)] h-[411px] justify-self-stretch relative rounded-[8px] row-1 shrink-0" data-name="Main Chart Area">
      <Container31 />
      <Container34 />
      <SimulatedChartUi />
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white w-full">
        <p className="leading-[28px]">Trust Index</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.875px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#dbeafe] text-[14px] w-full">
        <p className="leading-[22.75px] mb-0">Your platform safety score has</p>
        <p className="leading-[22.75px] mb-0">improved by 4 points this week</p>
        <p className="leading-[22.75px] mb-0">due to faster report resolution</p>
        <p className="leading-[22.75px]">times.</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col gap-[15.125px] items-start pb-[24px] relative shrink-0 w-full" data-name="Container">
      <Heading7 />
      <Container43 />
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-80 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-[91.25px]">
        <p className="leading-[16px]">Identity Verified</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-[27.42px]">
        <p className="leading-[16px]">98%</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Container46 />
          <Container47 />
        </div>
      </div>
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] h-[6px] overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Overlay">
      <div className="absolute bg-[#93c5fd] inset-[0_2%_0_0]" data-name="Background" />
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-80 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-[102.19px]">
        <p className="leading-[16px]">Payment Success</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-[27.73px]">
        <p className="leading-[16px]">94%</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Container49 />
          <Container50 />
        </div>
      </div>
    </div>
  );
}

function Overlay2() {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] h-[6px] overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Overlay">
      <div className="absolute bg-[#93c5fd] inset-[0_6%_0_0]" data-name="Background" />
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Container45 />
      <Overlay1 />
      <Container48 />
      <Overlay2 />
    </div>
  );
}

function SideInsightCard() {
  return (
    <div className="bg-[#00346f] col-3 drop-shadow-[0px_20px_20px_rgba(0,52,111,0.1)] justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="Side Insight Card">
      <div className="content-stretch flex flex-col items-start justify-between p-[32px] relative size-full">
        <Container42 />
        <Container44 />
      </div>
    </div>
  );
}

function VisualAnalyticsSectionAsymmetricLayout() {
  return (
    <div className="gap-x-[32px] gap-y-[32px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[_411px] relative shrink-0 w-full" data-name="Visual Analytics Section (Asymmetric Layout)">
      <MainChartArea />
      <SideInsightCard />
    </div>
  );
}

function Heading8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#00346f] text-[18px] w-[210.23px]">
        <p className="leading-[28px]">Recent Platform Activity</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#00346f] text-[12px] tracking-[1.2px] uppercase w-[66.48px]">
        <p className="leading-[16px]">View All</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading8 />
      <Link5 />
    </div>
  );
}

function Cell() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[196.27px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[10px] tracking-[1px] uppercase w-[30.45px]">
        <p className="leading-[normal]">User</p>
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[249.92px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[10px] tracking-[1px] uppercase w-[44.91px]">
        <p className="leading-[normal]">Action</p>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[190.17px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[10px] tracking-[1px] uppercase w-[45.03px]">
        <p className="leading-[normal]">Status</p>
      </div>
    </div>
  );
}

function Cell3() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[149.25px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[10px] tracking-[1px] uppercase w-[28.66px]">
        <p className="leading-[normal]">Time</p>
      </div>
    </div>
  );
}

function Cell4() {
  return (
    <div className="content-stretch flex flex-col items-end px-[24px] py-[16px] relative shrink-0 w-[142.39px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[10px] text-right tracking-[1px] uppercase w-[67.11px]">
        <p className="leading-[normal]">Reference</p>
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Cell />
      <Cell1 />
      <Cell2 />
      <Cell3 />
      <Cell4 />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[#f3f4f5] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Header">
      <Row />
    </div>
  );
}

function UserProfile() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="User Profile">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgUserProfile} />
      </div>
    </div>
  );
}

function Background21() {
  return (
    <div className="bg-[#e2e8f0] content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[12px] shrink-0 size-[32px]" data-name="Background">
      <UserProfile />
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[14px] w-[75.84px]">
        <p className="leading-[20px]">Alex Rivera</p>
      </div>
    </div>
  );
}

function Data() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-[148.27px]" data-name="Data">
      <Background21 />
      <Container52 />
    </div>
  );
}

function Data1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[23px] pt-[21.5px] px-[24px] relative shrink-0 w-[249.92px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] w-[158.83px]">
        <p className="leading-[20px]">Joined as Pro Mechanic</p>
      </div>
    </div>
  );
}

function Background22() {
  return (
    <div className="bg-[#eff6ff] content-stretch flex items-start px-[8px] py-[2px] relative rounded-[2px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#1d4ed8] text-[10px] uppercase w-[101.16px]">
        <p className="leading-[normal]">Pending Approval</p>
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[24.5px] pr-[24px] pt-[24px] relative shrink-0 w-[166.17px]" data-name="Data">
      <Background22 />
    </div>
  );
}

function Data3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[23px] pr-[24px] pt-[21.5px] relative shrink-0 w-[125.25px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[14px] w-[72.58px]">
        <p className="leading-[20px]">2 mins ago</p>
      </div>
    </div>
  );
}

function Data4() {
  return (
    <div className="content-stretch flex flex-col items-end pb-[22.5px] pt-[22px] px-[24px] relative shrink-0 w-[118.39px]" data-name="Data">
      <div className="flex flex-col font-['Liberation_Mono:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[14px] text-right w-[75.63px]">
        <p className="leading-[20px]">#USR-8921</p>
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="mb-[-1px] relative shrink-0 w-full" data-name="Row 1">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[24px] items-center justify-center pl-[24px] relative size-full">
          <Data />
          <Data1 />
          <Data2 />
          <Data3 />
          <Data4 />
        </div>
      </div>
    </div>
  );
}

function UserProfile1() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="User Profile">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgUserProfile1} />
      </div>
    </div>
  );
}

function Background23() {
  return (
    <div className="bg-[#e2e8f0] content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[12px] shrink-0 size-[32px]" data-name="Background">
      <UserProfile1 />
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[14px] w-[78.45px]">
        <p className="leading-[20px]">Sarah Chen</p>
      </div>
    </div>
  );
}

function Data5() {
  return (
    <div className="relative shrink-0 w-[148.27px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Background23 />
        <Container53 />
      </div>
    </div>
  );
}

function Data6() {
  return (
    <div className="relative shrink-0 w-[249.92px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[23px] pt-[22px] px-[24px] relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] w-[167.52px]">
          <p className="leading-[20px]">Reported a Service Delay</p>
        </div>
      </div>
    </div>
  );
}

function Background24() {
  return (
    <div className="bg-[#ffdbcc] content-stretch flex items-start px-[8px] py-[2px] relative rounded-[2px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#5f2200] text-[10px] uppercase w-[46.67px]">
        <p className="leading-[normal]">Flagged</p>
      </div>
    </div>
  );
}

function Data7() {
  return (
    <div className="relative shrink-0 w-[166.17px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[24px] py-[24.5px] relative size-full">
        <Background24 />
      </div>
    </div>
  );
}

function Data8() {
  return (
    <div className="relative shrink-0 w-[125.25px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[23px] pr-[24px] pt-[22px] relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[14px] w-[78.78px]">
          <p className="leading-[20px]">14 mins ago</p>
        </div>
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="relative shrink-0 w-[118.39px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end px-[24px] py-[22.5px] relative size-full">
        <div className="flex flex-col font-['Liberation_Mono:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[14px] text-right w-[75.63px]">
          <p className="leading-[20px]">#REP-4402</p>
        </div>
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="mb-[-1px] relative shrink-0 w-full" data-name="Row 2">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[24px] items-center justify-center pl-[24px] pt-px relative size-full">
          <Data5 />
          <Data6 />
          <Data7 />
          <Data8 />
          <Data9 />
        </div>
      </div>
    </div>
  );
}

function UserProfile2() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="User Profile">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgUserProfile2} />
      </div>
    </div>
  );
}

function Background25() {
  return (
    <div className="bg-[#e2e8f0] content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[12px] shrink-0 size-[32px]" data-name="Background">
      <UserProfile2 />
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[14px] w-[59.75px]">
        <p className="leading-[20px]">Marko V.</p>
      </div>
    </div>
  );
}

function Data10() {
  return (
    <div className="relative shrink-0 w-[148.27px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Background25 />
        <Container54 />
      </div>
    </div>
  );
}

function Data11() {
  return (
    <div className="relative shrink-0 w-[249.92px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[22.5px] pt-[22px] px-[24px] relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] w-[169.05px]">
          <p className="leading-[20px]">Completed ID Verification</p>
        </div>
      </div>
    </div>
  );
}

function Background26() {
  return (
    <div className="bg-[#f0fdf4] content-stretch flex items-start px-[8px] py-[2px] relative rounded-[2px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#15803d] text-[10px] uppercase w-[44.55px]">
        <p className="leading-[normal]">Verified</p>
      </div>
    </div>
  );
}

function Data12() {
  return (
    <div className="relative shrink-0 w-[166.17px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[24px] pr-[24px] pt-[24.5px] relative size-full">
        <Background26 />
      </div>
    </div>
  );
}

function Data13() {
  return (
    <div className="relative shrink-0 w-[125.25px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[22.5px] pr-[24px] pt-[22px] relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[14px] w-[81.63px]">
          <p className="leading-[20px]">42 mins ago</p>
        </div>
      </div>
    </div>
  );
}

function Data14() {
  return (
    <div className="relative shrink-0 w-[118.39px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end pb-[22px] pt-[22.5px] px-[24px] relative size-full">
        <div className="flex flex-col font-['Liberation_Mono:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[14px] text-right w-[75.63px]">
          <p className="leading-[20px]">#USR-8919</p>
        </div>
      </div>
    </div>
  );
}

function Row3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Row 3">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[24px] items-center justify-center pl-[24px] pt-px relative size-full">
          <Data10 />
          <Data11 />
          <Data12 />
          <Data13 />
          <Data14 />
        </div>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body">
      <Row1 />
      <Row2 />
      <Row3 />
    </div>
  );
}

function Table() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table">
      <Header />
      <Body />
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[8px] shadow-[0px_20px_40px_0px_rgba(25,28,29,0.04)] shrink-0 w-full" data-name="Background+Shadow">
      <Table />
    </div>
  );
}

function SectionRecentActivityReports() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Section - Recent Activity & Reports">
      <Container51 />
      <BackgroundShadow />
    </div>
  );
}

function MainContentArea() {
  return (
    <div className="flex-[1_0_0] min-w-px relative self-stretch" data-name="Main Content Area">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[48px] items-start p-[48px] relative size-full">
          <HeaderSection />
          <SectionBentoGridMetrics />
          <VisualAnalyticsSectionAsymmetricLayout />
          <SectionRecentActivityReports />
        </div>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] w-[259.25px]">
          <p className="leading-[15px]">© 2024 OneStopShop Framework. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] w-[80.55px]">
        <p className="leading-[15px]">Terms of Service</p>
      </div>
    </div>
  );
}

function Link7() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] w-[66.13px]">
        <p className="leading-[15px]">Privacy Policy</p>
      </div>
    </div>
  );
}

function Link8() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] w-[66.55px]">
        <p className="leading-[15px]">{`Trust & Safety`}</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="h-[15px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start relative size-full">
        <Link6 />
        <Link7 />
        <Link8 />
      </div>
    </div>
  );
}

function TheFooterIsUsuallyAtTheBottomOfThePageButForADashboardShellItIsOftenReplacedBy() {
  return (
    <div className="absolute backdrop-blur-[2px] bg-[rgba(248,250,252,0.8)] bottom-0 content-stretch flex items-center justify-between left-[256px] pb-[12px] pt-[13px] px-[32px] right-0" data-name="The Footer is usually at the bottom of the page, but for a Dashboard Shell, it is often replaced by ...">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-solid border-t inset-0 pointer-events-none" />
      <Container55 />
      <Container56 />
    </div>
  );
}

export default function PlatformAdminDashboard() {
  return (
    <div className="bg-[#f8f9fa] content-stretch flex items-start relative size-full" data-name="Platform Admin Dashboard">
      <AsideSideNavBarComponent />
      <MainContentArea />
      <TheFooterIsUsuallyAtTheBottomOfThePageButForADashboardShellItIsOftenReplacedBy />
    </div>
  );
}