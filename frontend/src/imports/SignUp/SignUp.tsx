import { useNavigate } from "react-router";
import svgPaths from "./svg-odoce6xvbm";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:Extra_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00346f] text-[60px] tracking-[-3px] w-full">
        <p className="leading-[60px] mb-0">Reliability</p>
        <p className="leading-[60px]">by Design.</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[448px] relative shrink-0 w-[448px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[117px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[18px] w-[441.78px]">
        <p className="leading-[29.25px] mb-0">Join the network where professional integrity meets</p>
        <p className="leading-[29.25px] mb-0">{`technical expertise. Whether you're behind the`}</p>
        <p className="leading-[29.25px] mb-0">wheel or under the hood, we ensure every</p>
        <p className="leading-[29.25px]">interaction is anchored in trust.</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[16.5px] items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#00346f] text-[14px] tracking-[1.4px] uppercase w-[142.3px]">
        <p className="leading-[20px]">OneStopShop</p>
      </div>
      <Heading />
      <Container2 />
    </div>
  );
}

function Overlay() {
  return (
    <div className="h-[36px] relative shrink-0 w-[32px]" data-name="Overlay">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 36">
        <g id="Overlay">
          <rect fill="var(--fill-0, #004A99)" fillOpacity="0.1" height="36" rx="4" width="32" />
          <path d={svgPaths.p2e997c80} fill="var(--fill-0, #00346F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] w-[169.05px]">
        <p className="leading-[24px]">Verified Professionals</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] w-[328.45px]">
        <p className="leading-[20px]">Rigorous background checks for every mechanic.</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[328.45px]" data-name="Container">
      <Heading2 />
      <Container4 />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[16px] relative shrink-0" data-name="Margin">
      <Container3 />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#f3f4f5] col-1 h-[92px] justify-self-stretch relative rounded-[8px] row-1 shrink-0" data-name="Background">
      <div className="content-stretch flex items-start p-[24px] relative size-full">
        <Overlay />
        <Margin />
      </div>
    </div>
  );
}

function Overlay1() {
  return (
    <div className="h-[36px] relative shrink-0 w-[32px]" data-name="Overlay">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 36">
        <g id="Overlay">
          <rect fill="var(--fill-0, #004A99)" fillOpacity="0.1" height="36" rx="4" width="32" />
          <path d={svgPaths.p215a3900} fill="var(--fill-0, #00346F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[16px] w-[159.81px]">
        <p className="leading-[24px]">Secure Network</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] w-[309.27px]">
        <p className="leading-[20px]">All personal information is protected</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[309.27px]" data-name="Container">
      <Heading3 />
      <Container6 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[16px] relative shrink-0" data-name="Margin">
      <Container5 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#f3f4f5] col-1 h-[92px] justify-self-stretch relative rounded-[8px] row-2 shrink-0" data-name="Background">
      <div className="content-stretch flex items-start p-[24px] relative size-full">
        <Overlay1 />
        <Margin1 />
      </div>
    </div>
  );
}

function BentoGridStyleFeatureHighlights() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[__92px_92px] relative shrink-0 w-full" data-name="Bento Grid Style Feature Highlights">
      <Background />
      <Background1 />
    </div>
  );
}

function BentoGridStyleFeatureHighlightsMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full" data-name="Bento Grid Style Feature Highlights:margin">
      <BentoGridStyleFeatureHighlights />
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p300a1100} fill="var(--fill-0, #00346F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate('/')}
      className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full cursor-pointer hover:opacity-80 transition-opacity"
      data-name="Link"
    >
      <Container7 />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#00346f] text-[16px] w-[143.67px]">
        <p className="leading-[24px]">Back to homepage</p>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[48px] relative shrink-0 w-full" data-name="Margin">
      <Link />
    </div>
  );
}

function LeftSideEditorialContextTrustBranding() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative self-stretch shrink-0 w-[453.33px]" data-name="Left Side: Editorial Context & Trust Branding">
      <Container1 />
      <BentoGridStyleFeatureHighlightsMargin />
      <Margin2 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[36px] justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[30px] text-center tracking-[-0.75px] w-[282.28px]">
        <p className="leading-[36px]">Create your account</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[16px] text-center w-[311.17px]">
        <p className="leading-[24px]">Choose the path that best describes you.</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Container9 />
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[20px] relative shrink-0 w-[22.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 20">
        <g id="Container">
          <path d={svgPaths.p2b4ecc20} fill="var(--fill-0, #9BBDFF)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#004a99] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[64px]" data-name="Background">
      <Container11 />
    </div>
  );
}

function Margin4() {
  return (
    <div className="h-[88px] relative shrink-0 w-[64px]" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[24px] relative size-full">
        <Background2 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[20px] text-center w-[107.08px]">
        <p className="leading-[28px]">{`I'm a Driver`}</p>
      </div>
    </div>
  );
}

function Heading3Margin() {
  return (
    <div className="relative shrink-0" data-name="Heading 3:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[8px] relative size-full">
        <Heading4 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-center px-[5.19px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[60px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] text-center w-[178.95px]">
        <p className="leading-[20px] mb-0">Looking for trustworthy,</p>
        <p className="leading-[20px] mb-0">professional mechanics for</p>
        <p className="leading-[20px]">my vehicle.</p>
      </div>
    </div>
  );
}

function Margin5() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[32px] relative size-full">
        <Container12 />
      </div>
    </div>
  );
}

function Button() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate('/driver/setup')}
      className="bg-[#00346f] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[4px] shrink-0 w-full cursor-pointer hover:bg-[#002a57] transition-colors"
      data-name="Button"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center py-[12px] relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white w-[74.91px]">
          <p className="leading-[24px]">Hire a Pro</p>
        </div>
      </div>
    </div>
  );
}

function DriverPath() {
  return (
    <div className="bg-[#f3f4f5] col-1 justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="Driver Path">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center justify-between p-[34px] relative size-full">
          <Margin4 />
          <Heading3Margin />
          <Margin5 />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 size-[22.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
        <g id="Container">
          <path d={svgPaths.p33e94780} fill="var(--fill-0, #4D5D7E)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#c6d7fd] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[64px]" data-name="Background">
      <Container13 />
    </div>
  );
}

function Margin6() {
  return (
    <div className="h-[88px] relative shrink-0 w-[64px]" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[24px] relative size-full">
        <Background3 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[20px] text-center w-[143.11px]">
        <p className="leading-[28px]">{`I'm a Mechanic`}</p>
      </div>
    </div>
  );
}

function Heading3Margin1() {
  return (
    <div className="relative shrink-0" data-name="Heading 3:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[8px] relative size-full">
        <Heading5 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-center pl-[2.17px] pr-[2.19px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[60px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] text-center w-[184.98px]">
        <p className="leading-[20px] mb-0">Providing expert services to</p>
        <p className="leading-[20px] mb-0">a community of vehicle</p>
        <p className="leading-[20px]">owners.</p>
      </div>
    </div>
  );
}

function Margin7() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[32px] relative size-full">
        <Container14 />
      </div>
    </div>
  );
}

function Button1() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate('/mechanic/setup')}
      className="bg-[#4e5f7f] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[4px] shrink-0 w-full cursor-pointer hover:bg-[#3d4b63] transition-colors"
      data-name="Button"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center py-[12px] relative size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white w-[121.66px]">
          <p className="leading-[24px]">Provide Service</p>
        </div>
      </div>
    </div>
  );
}

function MechanicPath() {
  return (
    <div className="bg-[#f3f4f5] col-2 justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="Mechanic Path">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center justify-between p-[34px] relative size-full">
          <Margin6 />
          <Heading3Margin1 />
          <Margin7 />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_332px] relative shrink-0 w-full" data-name="Container">
      <DriverPath />
      <MechanicPath />
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[40px] relative shrink-0 w-full" data-name="Margin">
      <Container10 />
    </div>
  );
}

function Container15() {
  const navigate = useNavigate();

  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#4e5f7f] text-[14px] w-[212.31px]">
          <p>
            <span className="leading-[20px]">{`Already have an account? `}</span>
            <span
              onClick={() => navigate('/login')}
              className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic text-[#00346f] cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex flex-col items-center pt-[25px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(194,198,211,0.2)] border-solid border-t inset-0 pointer-events-none" />
      <Container15 />
    </div>
  );
}

function Margin8() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[40px] relative shrink-0 w-full" data-name="Margin">
      <HorizontalBorder />
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-white drop-shadow-[0px_20px_20px_rgba(25,28,29,0.04)] relative rounded-[8px] shrink-0 w-full" data-name="Background+Shadow">
      <div className="content-stretch flex flex-col items-start p-[48px] relative size-full">
        <Container8 />
        <Margin3 />
        <Margin8 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[11.667px] relative shrink-0 w-[9.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 11.6667">
        <g id="Container">
          <path d={svgPaths.p1487da00} fill="var(--fill-0, #191C1D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin9() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[8px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[12px] tracking-[1.2px] uppercase w-[147.88px]">
        <p className="leading-[16px]">AES-256 Encrypted</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Container17 />
      <Margin9 />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[11.667px] relative shrink-0 w-[9.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 11.6667">
        <g id="Container">
          <path d={svgPaths.pf270e00} fill="var(--fill-0, #191C1D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin11() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[8px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[12px] tracking-[1.2px] uppercase w-[69.3px]">
        <p className="leading-[16px]">ISO 27001</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Container19 />
      <Margin11 />
    </div>
  );
}

function Margin10() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[24px] relative shrink-0" data-name="Margin">
      <Container18 />
    </div>
  );
}

function SecurityBadge() {
  return (
    <div className="content-stretch flex items-center justify-center opacity-60 relative shrink-0 w-full" data-name="Security Badge">
      <div aria-hidden="true" className="absolute bg-white inset-0 mix-blend-saturation pointer-events-none" />
      <Container16 />
      <Margin10 />
    </div>
  );
}

function SecurityBadgeMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full" data-name="Security Badge:margin">
      <SecurityBadge />
    </div>
  );
}

function RightSideThePathSelectionTheChoiceCanvas() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[634.67px]" data-name="Right Side: The Path Selection (The 'Choice' Canvas)">
      <BackgroundShadow />
      <SecurityBadgeMargin />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[64px] h-[661px] items-start max-w-[1152px] relative shrink-0 w-[1152px]" data-name="Container">
      <LeftSideEditorialContextTrustBranding />
      <RightSideThePathSelectionTheChoiceCanvas />
    </div>
  );
}

function MainTopNavBarSuppressedAccordingToShellVisibilityRuleTransactionalPage() {
  return (
    <div className="relative shrink-0 w-full" data-name="Main - TopNavBar: Suppressed according to Shell Visibility Rule (Transactional Page)">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[16px] py-[93.5px] relative size-full">
          <Container />
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-[129.17px]">
        <p className="leading-[28px]">OneStopShop</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[112.77px]">
        <p className="leading-[20px]">Terms of Service</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[92.58px]">
        <p className="leading-[20px]">Privacy Policy</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[104.14px]">
        <p className="leading-[20px]">Cookie Settings</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[194.13px]">
        <p className="leading-[20px]">Contact Professional Support</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex gap-[32px] h-[20px] items-start justify-center relative shrink-0" data-name="Container">
      <Link1 />
      <Link2 />
      <Link3 />
      <Link4 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex items-center justify-between max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <Container22 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] text-center w-[240.59px]">
        <p className="leading-[16px]">© 2024 OneStopShop. Built on Reliability.</p>
      </div>
    </div>
  );
}

function FooterComponentSharedComponentImplementation() {
  return (
    <div className="bg-[#f8fafc] relative shrink-0 w-full" data-name="Footer Component: Shared Component Implementation">
      <div className="content-stretch flex flex-col gap-[32px] items-start px-[32px] py-[48px] relative size-full">
        <Container20 />
        <Container23 />
      </div>
    </div>
  );
}

export default function SignUp() {
  return (
    <div className="bg-[#f8f9fa] content-stretch flex flex-col items-start justify-between relative size-full" data-name="Sign Up">
      <div className="absolute bg-gradient-to-l from-[rgba(0,74,153,0.05)] h-[1024px] right-0 to-[rgba(0,74,153,0)] top-0 w-[426.66px]" data-name="Visual Background Anchor (Subtle asymmetric texture)" />
      <div className="absolute bottom-0 h-[512px] left-0 w-[320px]" style={{ backgroundImage: "linear-gradient(57.9946deg, rgba(198, 215, 253, 0.05) 0%, rgba(198, 215, 253, 0) 100%)" }} data-name="Gradient" />
      <MainTopNavBarSuppressedAccordingToShellVisibilityRuleTransactionalPage />
      <FooterComponentSharedComponentImplementation />
    </div>
  );
}