import svgPaths from "./svg-sshg92vt6b";

function Container1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] py-[24px] relative size-full">
        <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1e3a8a] text-[20px] tracking-[-1px] w-full">
          <p className="leading-[28px]">OneStopShop</p>
        </div>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1e3a8a] text-[18px] w-full">
        <p className="leading-[28px]">Verification</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-full">
        <p className="leading-[16px]">Step 2 of 2</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[16px] px-[16px] relative size-full">
        <Heading1 />
        <Container3 />
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <Container2 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[19.964px] relative shrink-0 w-[18.049px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0489 19.9643">
        <g id="Container">
          <path d={svgPaths.p18018100} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[50.52px]">
        <p className="leading-[20px]">Identity</p>
      </div>
    </div>
  );
}

function LinkIdentityTabInactive() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Link - Identity Tab (Inactive)">
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
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
        <g id="Container">
          <path d={svgPaths.p22be0c00} fill="var(--fill-0, #1E3A8A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#1e3a8a] text-[14px] w-[77.34px]">
        <p className="leading-[20px]">Documents</p>
      </div>
    </div>
  );
}

function LinkDocumentsTabActiveClosestMatchToVerificationPage() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[4px] shrink-0 w-full" data-name="Link - Documents Tab (Active - Closest Match to Verification Page)">
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
    <div className="h-[20px] relative shrink-0 w-[17px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 20">
        <g id="Container">
          <path d={svgPaths.p2d9a1e80} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[53.66px]">
        <p className="leading-[20px]">Support</p>
      </div>
    </div>
  );
}

function LinkSupportTabInactive() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Link - Support Tab (Inactive)">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <Container8 />
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px relative w-full" data-name="Nav">
      <LinkIdentityTabInactive />
      <LinkDocumentsTabActiveClosestMatchToVerificationPage />
      <LinkSupportTabInactive />
    </div>
  );
}

function NavMargin() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Nav:margin">
      <div className="flex flex-col justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center pt-[16px] relative size-full">
          <Nav />
        </div>
      </div>
    </div>
  );
}

function Container11() {
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

function Overlay() {
  return (
    <div className="bg-[rgba(0,74,153,0.2)] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[40px]" data-name="Overlay">
      <Container11 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[12px] w-[135.13px]">
        <p className="leading-[16px]">Verification in progress</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#737783] text-[10px] w-[62.52px]">
        <p className="leading-[20px]">Driver Profile</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[135.13px]" data-name="Container">
      <Container13 />
      <Container14 />
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center p-[16px] relative size-full">
          <Overlay />
          <Container12 />
        </div>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <Container10 />
      </div>
    </div>
  );
}

function AsideSideNavBarAuthoritySourceJson() {
  return (
    <div className="bg-[#f8fafc] content-stretch flex flex-col h-[504px] items-start pl-[16px] pr-[17px] py-[16px] relative shrink-0 w-[256px]" data-name="Aside - SideNavBar: Authority Source JSON">
      <div aria-hidden="true" className="absolute border-[rgba(226,232,240,0.2)] border-r border-solid inset-0 pointer-events-none" />
      <Container1 />
      <Margin />
      <NavMargin />
      <Margin1 />
    </div>
  );
}

function SubtleBackgroundPattern() {
  return (
    <div className="absolute h-[128px] right-0 top-0 w-[144px]" data-name="Subtle Background Pattern">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 144 128">
        <g id="Subtle Background Pattern" opacity="0.05">
          <path d={svgPaths.p1cc1b200} fill="var(--fill-0, #191C1D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[20px] relative shrink-0 w-[25px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 20">
        <g id="Container">
          <path d={svgPaths.pc8940a0} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div className="absolute bg-[#004a99] content-stretch flex items-center justify-center left-0 py-[14px] rounded-[12px] top-0 w-[64px]" data-name="Background">
      <Container16 />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[96px]" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:Extra_Bold',sans-serif] h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[#00346f] text-[36px] tracking-[-0.9px] w-[289.23px]">
        <p className="leading-[40px]">Check your email</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[152px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[88px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[18px] w-[467.02px]">
        <p className="leading-[29.25px] mb-0">{`We've sent a verification link to`}</p>
        <p className="mb-0">
          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[29.25px] not-italic text-[#191c1d]">driver.verification@example.com</span>
          <span className="leading-[29.25px]">. Please click the link</span>
        </p>
        <p className="leading-[29.25px]">to confirm your account and continue your setup.</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white w-[133.97px]">
        <p className="leading-[24px]">Open Email Inbox</p>
      </div>
    </div>
  );
}

function Container19() {
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

function Button() {
  return (
    <div className="bg-[#00346f] content-stretch flex gap-[8px] items-center justify-center pl-[162px] pr-[162.01px] py-[16px] relative rounded-[4px] shrink-0" data-name="Button">
      <Container18 />
      <Container19 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#737783] text-[14px] w-[162.69px]">
        <p className="leading-[20px]">{`Didn't receive the email?`}</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#00346f] text-[14px] text-center w-[132.22px]">
        <p className="leading-[20px]">Resend Verification</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container21 />
        <Button1 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[11.667px] relative shrink-0 w-[9.917px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.91667 11.6667">
        <g id="Container">
          <path d={svgPaths.p355c4700} fill="var(--fill-0, #4E5F7F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link() {
  return (
    <div className="relative shrink-0" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.99px] items-center relative size-full">
        <Container22 />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] w-[110.16px]">
          <p className="leading-[20px]">Contact Support</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex items-center justify-between pt-[25px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(194,198,211,0.2)] border-solid border-t inset-0 pointer-events-none" />
      <Container20 />
      <Link />
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full" data-name="Margin">
      <HorizontalBorder />
    </div>
  );
}

function ActionStack() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-0 right-0 top-[279.75px]" data-name="Action Stack">
      <Button />
      <Margin2 />
    </div>
  );
}

function EditorialTypography() {
  return (
    <div className="h-[420.75px] relative shrink-0 w-full" data-name="Editorial Typography">
      <Background />
      <Heading />
      <Container17 />
      <ActionStack />
    </div>
  );
}

function VerificationCard() {
  return (
    <div className="bg-white relative rounded-[8px] shadow-[0px_20px_40px_0px_rgba(25,28,29,0.04)] shrink-0 w-full" data-name="Verification Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[48px] relative size-full">
          <SubtleBackgroundPattern />
          <EditorialTypography />
        </div>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
        <g id="Container">
          <path d={svgPaths.p2bdb86e0} fill="var(--fill-0, #00346F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Heading 3">
      <Container23 />
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] w-[90.66px]">
        <p className="leading-[24px]">Why verify?</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.875px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] w-full">
        <p className="leading-[22.75px] mb-0">Verification ensures the security of</p>
        <p className="leading-[22.75px] mb-0">our community and helps build</p>
        <p className="leading-[22.75px] mb-0">trust with clients seeking</p>
        <p className="leading-[22.75px]">automotive services.</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#f3f4f5] col-1 justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col gap-[7.125px] items-start p-[24px] relative size-full">
        <Heading2 />
        <Container24 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p256e1340} fill="var(--fill-0, #00346F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Heading 3">
      <Container25 />
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] w-[82.44px]">
        <p className="leading-[24px]">Link expiry</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] w-full">
        <p className="leading-[22.75px] mb-0">The verification link is valid for 24</p>
        <p className="leading-[22.75px] mb-0">hours. If it expires, simply click</p>
        <p className="leading-[22.75px]">{`'Resend Verification' above.`}</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#f3f4f5] col-2 justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col gap-[6.75px] items-start pb-[46.75px] pt-[24px] px-[24px] relative size-full">
        <Heading3 />
        <Container26 />
      </div>
    </div>
  );
}

function AdditionalInformationLayer() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_171px] relative shrink-0 w-full" data-name="Additional Information Layer">
      <Background1 />
      <Background2 />
    </div>
  );
}

function ArchitecturalAnchorAsymmetricLayout() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Architectural Anchor: Asymmetric Layout">
      <VerificationCard />
      <AdditionalInformationLayer />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[576px] relative shrink-0 w-[576px]" data-name="Container">
      <ArchitecturalAnchorAsymmetricLayout />
    </div>
  );
}

function SectionVerificationContentContainer() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Section - Verification Content Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[24px] relative size-full">
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#737783] text-[12px] text-center tracking-[1.2px] uppercase w-[361.42px]">
        <p className="leading-[16px]">© 2024 OneStopshop Professional Network</p>
      </div>
    </div>
  );
}

function FooterAnchor() {
  return (
    <div className="relative shrink-0 w-full" data-name="Footer Anchor">
      <div className="content-stretch flex flex-col items-start p-[32px] relative size-full">
        <Container27 />
      </div>
    </div>
  );
}

function MainContentCanvas() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative self-stretch" data-name="Main Content Canvas">
      <SectionVerificationContentContainer />
      <FooterAnchor />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex items-start min-h-[1024px] relative shrink-0 w-full" data-name="Container">
      <AsideSideNavBarAuthoritySourceJson />
      <MainContentCanvas />
    </div>
  );
}

export default function DriverEmailVerification() {
  return (
    <div className="bg-[#f8f9fa] content-stretch flex flex-col items-start relative size-full" data-name="Driver Email Verification">
      <Container />
    </div>
  );
}