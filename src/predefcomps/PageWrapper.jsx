import React from 'react';

const PageWrapper = ({
    children,
    // Background properties
    backgroundColor = '#ffffff',
    backgroundImage = null,
    backgroundGradient = null,
    backgroundPosition = 'center',
    backgroundSize = 'cover',
    backgroundRepeat = 'no-repeat',

    // Layout properties
    maxWidth = '1200px',
    minHeight = '100vh',
    padding = '20px',
    paddingTop = null,
    paddingBottom = null,
    paddingLeft = null,
    paddingRight = null,

    // Spacing
    marginTop = '0px',
    marginBottom = '0px',

    // Typography defaults
    textColor = '#1f2937',
    fontFamily = 'system-ui, -apple-system, sans-serif',

    // Container behavior
    centerContent = true,
    fullWidth = false,

    // Additional styling
    borderRadius = '0px',
    boxShadow = 'none',

    // Custom classes (for advanced users)
    className = '',

    // Animation
    fadeIn = false,

    // Responsive behavior
    mobileMaxWidth = '100%',
    mobilePadding = '16px',

    ...otherProps
}) => {
    // Helper function to convert color values to valid CSS
    const processColor = (color) => {
        if (!color) return 'transparent';
        // Handle hex colors, rgb, rgba, named colors, etc.
        return color;
    };

    // Helper function to convert size values
    const processSize = (size) => {
        if (typeof size === 'number') return `${size}px`;
        return size;
    };

    // Build background styles
    const getBackgroundStyle = () => {
        let bgStyle = {};

        if (backgroundGradient) {
            bgStyle.backgroundImage = backgroundGradient;
        } else if (backgroundImage) {
            bgStyle.backgroundImage = `url(${backgroundImage})`;
            bgStyle.backgroundPosition = backgroundPosition;
            bgStyle.backgroundSize = backgroundSize;
            bgStyle.backgroundRepeat = backgroundRepeat;
        } else {
            bgStyle.backgroundColor = processColor(backgroundColor);
        }

        return bgStyle;
    };

    // Build padding styles
    const getPaddingStyle = () => {
        if (paddingTop || paddingBottom || paddingLeft || paddingRight) {
            return {
                paddingTop: processSize(paddingTop || padding),
                paddingBottom: processSize(paddingBottom || padding),
                paddingLeft: processSize(paddingLeft || padding),
                paddingRight: processSize(paddingRight || padding),
            };
        }
        return { padding: processSize(padding) };
    };

    // Main container styles
    const containerStyles = {
        minHeight: processSize(minHeight),
        color: processColor(textColor),
        fontFamily: fontFamily,
        marginTop: processSize(marginTop),
        marginBottom: processSize(marginBottom),
        borderRadius: processSize(borderRadius),
        boxShadow: boxShadow,
        ...getBackgroundStyle(),
        ...(fadeIn && {
            animation: 'fadeIn 0.6s ease-in-out',
        }),
    };

    // Inner container styles for content centering and max-width
    const innerContainerStyles = {
        maxWidth: fullWidth ? '100%' : processSize(maxWidth),
        width: '100%',
        margin: centerContent ? '0 auto' : '0',
        ...getPaddingStyle(),
    };

    // Responsive classes using Tailwind
    const responsiveClasses = `
    ${!fullWidth ? `max-w-7xl mx-auto` : ''}
    ${centerContent ? 'mx-auto' : ''}
  `;

    return (
        <>
            {fadeIn && (
                <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
            )}

            <div
                style={containerStyles}
                className={`relative w-full ${className}`}
                {...otherProps}
            >
                {/* Background overlay for better text readability when using background images */}
                {backgroundImage && (
                    <div
                        className="absolute inset-0 bg-black bg-opacity-20 pointer-events-none"
                        style={{ borderRadius: processSize(borderRadius) }}
                    />
                )}

                <div
                    style={innerContainerStyles}
                    className={`relative z-10 ${responsiveClasses.trim()}`}
                >
                    {/* Mobile-responsive container */}
                    <div className={`
            w-full
            px-4 sm:px-6 lg:px-8
            ${fullWidth ? '' : 'max-w-none sm:max-w-none lg:max-w-7xl'}
          `}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

// Default export with some common presets
export const MarketingPageWrapper = (props) => (
    <PageWrapper
        backgroundColor="#f8fafc"
        padding="40px"
        paddingTop="60px"
        paddingBottom="60px"
        textColor="#1e293b"
        fadeIn={true}
        {...props}
    />
);

export const HeroPageWrapper = (props) => (
    <PageWrapper
        minHeight="100vh"
        backgroundColor="#0f172a"
        backgroundGradient="linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
        textColor="#f8fafc"
        centerContent={true}
        padding="80px"
        fadeIn={true}
        {...props}
    />
);

export const ContentPageWrapper = (props) => (
    <PageWrapper
        backgroundColor="#ffffff"
        maxWidth="800px"
        padding="40px"
        paddingTop="80px"
        paddingBottom="80px"
        textColor="#374151"
        boxShadow="0 1px 3px 0 rgba(0, 0, 0, 0.1)"
        borderRadius="8px"
        {...props}
    />
);

export default PageWrapper;
