import svgPaths from "./svg-aerrmhid3n";
import imgProfessionalMechanicProfile from "./ea3883739f7aab471d9a991c9cdf9ffbf8264db8.png";
import imgMechanicProfile from "./5e027ba885d250a35395500ca5bef88686f2dacb.png";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:Extra_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1e3a8a] text-[20px] w-full">
        <p className="leading-[28px]">Mechanic Portal</p>
      </div>
    </div>
  );
}

function ProfessionalMechanicProfile() {
  return (
    <div className="max-w-[207px] relative rounded-[9999px] shrink-0 size-[40px]" data-name="Professional Mechanic Profile">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgProfessionalMechanicProfile} />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#00346f] text-[14px] w-[75.84px]">
        <p className="leading-[20px]">John Doe</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[30px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[10px] tracking-[0.5px] uppercase w-[82.58px]">
        <p className="leading-[15px] mb-0">Service</p>
        <p className="leading-[15px]">Professional</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[82.58px]" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-white drop-shadow-[0px_20px_20px_rgba(25,28,29,0.04)] relative rounded-[8px] shrink-0 w-full" data-name="Background+Shadow">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center p-[12px] relative size-full">
          <ProfessionalMechanicProfile />
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start px-[8px] relative size-full">
        <Heading />
        <BackgroundShadow />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
        <g id="Container">
          <path d={svgPaths.p2a946800} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[0.6px] uppercase w-[68.83px]">
        <p className="leading-[16px]">Bookings</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <Container4 />
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p3ffd6800} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[0.6px] uppercase w-[70.94px]">
        <p className="leading-[16px]">Messages</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <Container6 />
          <Container7 />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[20.1px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.1 20">
        <g id="Container">
          <path d={svgPaths.p1589e300} fill="var(--fill-0, #1E3A8A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#1e3a8a] text-[12px] tracking-[0.6px] uppercase w-[64.95px]">
          <p className="leading-[16px]">Settings</p>
        </div>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="bg-[#eff6ff] relative shrink-0 w-full" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#1e3a8a] border-r-4 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[16px] pr-[20px] py-[12px] relative size-full">
          <Container8 />
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px relative w-full" data-name="Nav">
      <Link />
      <Link1 />
      <Link2 />
    </div>
  );
}

function NavMargin() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Nav:margin">
      <div className="flex flex-col justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center pt-[24px] relative size-full">
          <Nav />
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#00346f] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center py-[12px] relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white w-[66.05px]">
          <p className="leading-[20px]">Go Online</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-solid border-t inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pt-[17px] px-[8px] relative size-full">
        <Button />
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[24px] relative size-full">
        <HorizontalBorder />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p2816f2c0} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container12() {
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
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <Container11 />
          <Container12 />
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p3e9df400} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container14() {
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
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <Container13 />
          <Container14 />
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Link3 />
      <Link4 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[24px] relative size-full">
        <Container10 />
      </div>
    </div>
  );
}

function AsideSideNavBar() {
  return (
    <div className="bg-[#f8fafc] content-stretch flex flex-col h-[1265px] items-start pl-[16px] pr-[17px] py-[24px] relative shrink-0 w-[256px]" data-name="Aside - SideNavBar">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-r border-solid inset-0 pointer-events-none" />
      <Container />
      <NavMargin />
      <Margin />
      <Margin1 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[32px] justify-center leading-[0] relative shrink-0 text-[#1e3a8a] text-[24px] tracking-[-0.6px] w-[142.97px]">
        <p className="leading-[32px]">Profile Editor</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] text-center w-[115.53px]">
        <p className="leading-[20px]">Discard Changes</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#00346f] content-stretch drop-shadow-[0px_4px_6px_rgba(0,52,111,0.2)] flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white w-[80.63px]">
        <p className="leading-[20px]">Save Profile</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[16.01px] items-start relative shrink-0" data-name="Container">
      <Button1 />
      <Button2 />
    </div>
  );
}

function HeaderTopAppBarContext() {
  return (
    <div className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.8)] h-[80px] relative shrink-0 w-full" data-name="Header - TopAppBar Context">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[32px] relative size-full">
          <Heading1 />
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p85bff00} fill="var(--fill-0, #00346F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Heading 3">
      <Container18 />
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[#00346f] text-[18px] w-[181.27px]">
        <p className="leading-[28px]">Professional Identity</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Heading2 />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[16px]">Display Name</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[16px] w-full">
        <p className="leading-[24px]">John Doe</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[8px] shadow-[0px_0px_0px_1px_rgba(194,198,211,0.2)] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center p-[12px] relative size-full">
          <Container21 />
          <div className="opacity-50 overflow-clip relative shrink-0 size-[22px]" data-name="Edit">
            <div className="absolute inset-[7.83%_7.83%_8.33%_8.33%]" data-name="Icon">
              <div className="absolute inset-[-8.13%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.4445 21.4445">
                  <path d={svgPaths.p1fce1300} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[8px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <Label />
      <Input />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[16px]">Professional Title</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[202px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[48px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[14px] w-full">
        <p className="leading-[24px]">Master Diagnostic Technician</p>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white relative rounded-[8px] shadow-[0px_0px_0px_1px_rgba(194,198,211,0.2)] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center p-[12px] relative size-full">
          <Container23 />
          <div className="opacity-50 overflow-clip relative shrink-0 size-[22px]" data-name="Edit">
            <div className="absolute inset-[7.83%_7.83%_8.33%_8.33%]" data-name="Icon">
              <div className="absolute inset-[-8.13%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.4445 21.4445">
                  <path d={svgPaths.p1fce1300} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[8px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <Label1 />
      <Input1 />
    </div>
  );
}

function Container19() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_72px] relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Container22 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[16px]">Professional Bio</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[55.57px] overflow-clip relative w-full">
      <div className="absolute flex items-center justify-center left-[464.01px] size-[22.051px] top-[-0.15px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "22" } as React.CSSProperties}>
        <div className="flex-none rotate-[0.13deg]">
          <div className="opacity-50 overflow-clip relative size-[22px]" data-name="Edit">
            <div className="absolute inset-[7.83%_7.83%_8.33%_8.33%]" data-name="Icon">
              <div className="absolute inset-[-8.13%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.4445 21.4445">
                  <path d={svgPaths.p1fce1300} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col h-[161px] items-start relative shrink-0 w-[528px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[16px] w-full whitespace-pre-wrap">
        <p className="leading-[26px] mb-0">{`Specializing in European performance vehicles and complex `}</p>
        <p className="leading-[26px] mb-0">{`electrical diagnostics. Over 15 years of experience providing `}</p>
        <p className="leading-[26px] mb-0">{`dealership-level service at competitive rates. Certified ASE Master `}</p>
        <p className="leading-[26px]">Technician.</p>
      </div>
      <div className="flex h-[56.787px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "22" } as React.CSSProperties}>
        <div className="flex-none rotate-[-0.13deg] w-full">
          <Frame />
        </div>
      </div>
    </div>
  );
}

function Textarea() {
  return (
    <div className="bg-white h-[163px] relative rounded-[8px] shadow-[0px_0px_0px_1px_rgba(194,198,211,0.2)] shrink-0 w-full" data-name="Textarea">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center p-[12px] relative size-full">
          <Container25 />
        </div>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#c6d7fd] text-[10px] w-full">
        <p className="leading-[15px]">Briefly describe your expertise and why customers should trust you.</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[211px] items-start relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <Textarea />
      <Container26 />
    </div>
  );
}

function SectionBioIdentity() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Section - Bio & Identity">
      <Container17 />
      <Container19 />
      <Container24 />
    </div>
  );
}

function Container27() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.pbbc3b40} fill="var(--fill-0, #00346F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container27 />
        <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[#00346f] text-[18px] w-[130.84px]">
          <p className="leading-[28px]">Service Details</p>
        </div>
      </div>
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[16px]">Specialties</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="relative shrink-0 size-[8.167px]" data-name="Button">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.16667 8.16667">
        <g id="Button">
          <path d={svgPaths.p2317cf00} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#00346f] relative rounded-[9999px] self-stretch shrink-0" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[12px] py-[4px] relative size-full">
          <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-[68.41px]">
            <p className="leading-[16px]">Diagnostics</p>
          </div>
          <Button3 />
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="relative shrink-0 size-[8.167px]" data-name="Button">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.16667 8.16667">
        <g id="Button">
          <path d={svgPaths.p2317cf00} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#00346f] relative rounded-[9999px] self-stretch shrink-0" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[12px] py-[4px] relative size-full">
          <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-[79.89px]">
            <p className="leading-[16px]">Engine Repair</p>
          </div>
          <Button4 />
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="relative shrink-0 size-[8.167px]" data-name="Button">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.16667 8.16667">
        <g id="Button">
          <path d={svgPaths.p2317cf00} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#00346f] relative rounded-[9999px] self-stretch shrink-0" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[12px] py-[4px] relative size-full">
          <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-[86.22px]">
            <p className="leading-[16px]">Brake Systems</p>
          </div>
          <Button5 />
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center pb-[6.5px] pt-[5.5px] px-[13px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#c2c6d3] border-dashed inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] text-center w-[91.94px]">
        <p className="leading-[16px]">+ Add Specialty</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Background />
      <Background1 />
      <Background2 />
      <Button6 />
    </div>
  );
}

function Container28() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative size-full">
        <Label3 />
        <Container29 />
      </div>
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[16px]">Primary Location</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[16px] w-full">
        <p className="leading-[24px]">{`Bedfordview, Germiston `}</p>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white relative rounded-[8px] shadow-[0px_0px_0px_1px_rgba(194,198,211,0.2)] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pl-[40px] pr-[16px] py-[12px] relative size-full">
          <Container33 />
        </div>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute bottom-[20.83%] content-stretch flex flex-col items-start left-[12px] top-[20.83%]" data-name="Container">
      <div className="h-[15px] relative shrink-0 w-[12px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 15">
          <path d={svgPaths.p1a900f00} fill="var(--fill-0, #4E5F7F)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input2 />
      <Container34 />
    </div>
  );
}

function Container31() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[8px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <Label4 />
      <Container32 />
    </div>
  );
}

function Container30() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_72px] relative size-full">
        <Container31 />
      </div>
    </div>
  );
}

function SectionExpertiseLocation() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start pt-[25px] relative shrink-0 w-full" data-name="Section - Expertise & Location">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none" />
      <Heading3 />
      <Container28 />
      <Container30 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] tracking-[1.2px] uppercase w-full">
          <p className="leading-[16px]">Availability</p>
        </div>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[12px] w-full">
        <p className="leading-[16px]">Mon - Fri</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[12px] w-full">
        <p className="leading-[16px]">8:00 AM - 6:00 PM</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#f3f4f5] col-1 justify-self-stretch relative rounded-[2px] row-1 self-start shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col items-start p-[8px] relative size-full">
        <Container36 />
        <Container37 />
      </div>
    </div>
  );
}

function Container38() {
  return <div className="col-1 relative row-2 shrink-0 size-[48px]" data-name="Container" />;
}

function Container35() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[__48px_fit-content(100%)] relative size-full">
        <Background3 />
        <Container38 />
        <div className="bg-[#f3f4f5] col-2 opacity-65 overflow-clip relative row-1 shrink-0 size-[40px]" data-name="Plus">
          <div className="absolute inset-[20.83%]" data-name="Icon">
            <div className="absolute inset-[-7.5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.8333 26.8333">
                <path d={svgPaths.p3f2e3c00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[152px] items-start left-0 pt-[25px] right-0 top-0" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(194,198,211,0.2)] border-solid border-t inset-0 pointer-events-none" />
      <Heading4 />
      <Container35 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-[190px] overflow-clip relative shrink-0 w-[523px]">
      <HorizontalBorder1 />
    </div>
  );
}

function FormSection() {
  return (
    <div className="col-[1/span_7] content-stretch flex flex-col gap-[40px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Form Section">
      <SectionBioIdentity />
      <SectionExpertiseLocation />
      <Frame2 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 4">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] relative shrink-0 text-[#4e5f7f] text-[12px] tracking-[1.8px] uppercase w-[150.09px]">
        <p className="leading-[16px]">Customer Preview</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#ffdbcc] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[2px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#351000] text-[10px] w-[69.61px]">
        <p className="leading-[15px]">LIVE PREVIEW</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading5 />
      <Background4 />
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

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <MechanicProfile />
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[20px] w-full">
        <p className="leading-[28px] mb-0">John</p>
        <p className="leading-[28px]">Doe</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] tracking-[0.7px] uppercase w-full">
        <p className="leading-[20px] mb-0">Engine</p>
        <p className="leading-[20px]">Master</p>
      </div>
    </div>
  );
}

function Container46() {
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

function Container47() {
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

function Container45() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pt-[4px] relative shrink-0 w-full" data-name="Container">
      <Container46 />
      <Container47 />
      <Margin2 />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="Container">
      <Heading6 />
      <Container44 />
      <Container45 />
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Container42 />
      <Container43 />
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

function Container49() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Background5 />
      <Background6 />
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#424751] text-[16px] w-full">
        <p className="leading-[24px] mb-0">{`"15 years of precision tuning`}</p>
        <p className="leading-[24px]">for performance European…</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pb-[8px] relative shrink-0 w-full" data-name="Container">
      <Container49 />
      <Container50 />
    </div>
  );
}

function Button7() {
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
          <Button7 />
        </div>
      </div>
    </div>
  );
}

function MechanicCard() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_20px_20px_rgba(25,28,29,0.04)] flex flex-col gap-[24px] h-[470px] items-start left-[8px] p-[24px] right-[7px] rounded-[8px] top-[-9px]" data-name="Mechanic Card 5">
      <Container41 />
      <Container48 />
      <HorizontalBorder2 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="h-[451px] overflow-clip relative shrink-0 w-[371px]">
      <MechanicCard />
    </div>
  );
}

function Container51() {
  return (
    <div className="h-[20px] relative shrink-0 w-[15px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 20">
        <g id="Container">
          <path d={svgPaths.pb720300} fill="var(--fill-0, #5F2200)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Heading 5">
      <Container51 />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#00346f] text-[14px] w-[69.11px]">
        <p className="leading-[20px]">Profile Tip</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4d5d7e] text-[12px] w-full">
        <p className="leading-[19.5px] mb-0">Professionals with at least 3 high-quality workshop</p>
        <p className="mb-0">
          <span className="leading-[19.5px]">{`photos receive `}</span>
          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] not-italic text-[#00346f]">40% more booking inquiries</span>
          <span className="leading-[19.5px]">. Consider</span>
        </p>
        <p className="leading-[19.5px]">adding a photo of your workspace!</p>
      </div>
    </div>
  );
}

function TipCard() {
  return (
    <div className="bg-[#f3f4f5] relative rounded-[8px] shrink-0 w-full" data-name="Tip Card">
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[24px] relative size-full">
        <Heading7 />
        <Container52 />
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[1022px] items-start relative shrink-0 w-full" data-name="Container">
      <Container40 />
      <Frame1 />
      <TipCard />
    </div>
  );
}

function PreviewStickySidebar() {
  return (
    <div className="col-[8/span_5] content-stretch flex flex-col h-[935px] items-start justify-self-stretch pb-[210.58px] relative row-1 self-start shrink-0" data-name="Preview Sticky Sidebar">
      <Container39 />
    </div>
  );
}

function Container16() {
  return (
    <div className="gap-x-[48px] gap-y-[48px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_882.33px] h-[935px] relative shrink-0 w-[960px]" data-name="Container">
      <FormSection />
      <PreviewStickySidebar />
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-[129.17px]">
        <p className="leading-[28px]">OneStopShop</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[362.94px]">
        <p className="leading-[20px]">© 2024 OneStopShop Framework. All rights reserved.</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[362.94px]" data-name="Container">
      <Container55 />
      <Container56 />
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-80 relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[112.77px]">
        <p className="leading-[20px]">Terms of Service</p>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-80 relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[92.58px]">
        <p className="leading-[20px]">Privacy Policy</p>
      </div>
    </div>
  );
}

function Link7() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-80 relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[93.16px]">
        <p className="leading-[20px]">{`Trust & Safety`}</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex gap-[32px] h-[20px] items-start relative shrink-0" data-name="Container">
      <Link5 />
      <Link6 />
      <Link7 />
    </div>
  );
}

function Container53() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center max-w-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between max-w-[inherit] px-[32px] relative size-full">
          <Container54 />
          <Container57 />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#f8fafc] content-stretch flex flex-col h-[138px] items-start pb-[48px] pt-[49px] relative shrink-0 w-full" data-name="Footer">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-solid border-t inset-0 pointer-events-none" />
      <Container53 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-center min-w-px overflow-clip relative self-stretch" data-name="Main Content">
      <HeaderTopAppBarContext />
      <Container16 />
      <Footer />
    </div>
  );
}

export default function MyMechanicProfile() {
  return (
    <div className="bg-[#f8fafc] content-stretch flex items-start relative size-full" data-name="My Mechanic Profile">
      <AsideSideNavBar />
      <MainContent />
    </div>
  );
}