import React from 'react';
import { getCategorizedDefaultProps } from './metadata';

const PageWrapper = ({ children, background = {}, layout = {}, spacing = {} }) => {
    // Get categorized default props from metadata
    const defaults = getCategorizedDefaultProps("PageWrapper");

    // Merge props with defaults for each category
    const finalBackground = {
        backgroundColor: background.backgroundColor ?? defaults.background?.backgroundColor,
        backgroundImage: background.backgroundImage ?? defaults.background?.backgroundImage,
        backgroundGradient: background.backgroundGradient ?? defaults.background?.backgroundGradient,
        backgroundPosition: background.backgroundPosition ?? defaults.background?.backgroundPosition,
        backgroundSize: background.backgroundSize ?? defaults.background?.backgroundSize,
        backgroundRepeat: background.backgroundRepeat ?? defaults.background?.backgroundRepeat
    };

    const finalLayout = {
        maxWidth: layout.maxWidth ?? defaults.layout?.maxWidth,
        minHeight: layout.minHeight ?? defaults.layout?.minHeight,
        padding: layout.padding ?? defaults.layout?.padding,
        paddingTop: layout.paddingTop ?? defaults.layout?.paddingTop,
        paddingBottom: layout.paddingBottom ?? defaults.layout?.paddingBottom,
        paddingLeft: layout.paddingLeft ?? defaults.layout?.paddingLeft,
        paddingRight: layout.paddingRight ?? defaults.layout?.paddingRight
    };

    const finalSpacing = {
        marginTop: spacing.marginTop ?? defaults.spacing?.marginTop,
        marginBottom: spacing.marginBottom ?? defaults.spacing?.marginBottom
    };
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

        if (finalBackground.backgroundGradient) {
            bgStyle.backgroundImage = finalBackground.backgroundGradient;
        } else if (finalBackground.backgroundImage) {
            bgStyle.backgroundImage = `url(${finalBackground.backgroundImage})`;
            bgStyle.backgroundPosition = finalBackground.backgroundPosition;
            bgStyle.backgroundSize = finalBackground.backgroundSize;
            bgStyle.backgroundRepeat = finalBackground.backgroundRepeat;
        } else {
            bgStyle.backgroundColor = processColor(finalBackground.backgroundColor);
        }

        return bgStyle;
    };

    // Build padding styles
    const getPaddingStyle = () => {
        if (finalLayout.paddingTop || finalLayout.paddingBottom || finalLayout.paddingLeft || finalLayout.paddingRight) {
            return {
                paddingTop: processSize(finalLayout.paddingTop || finalLayout.padding),
                paddingBottom: processSize(finalLayout.paddingBottom || finalLayout.padding),
                paddingLeft: processSize(finalLayout.paddingLeft || finalLayout.padding),
                paddingRight: processSize(finalLayout.paddingRight || finalLayout.padding),
            };
        }
        return { padding: processSize(finalLayout.padding) };
    };

    // Main container styles
    const containerStyles = {
        minHeight: processSize(finalLayout.minHeight),
        marginTop: processSize(finalSpacing.marginTop),
        marginBottom: processSize(finalSpacing.marginBottom),
        ...getBackgroundStyle(),
    };

    // Inner container styles for content centering and max-width
    const innerContainerStyles = {
        maxWidth: processSize(finalLayout.maxWidth),
        width: '100%',
        margin: '0 auto',
        ...getPaddingStyle(),
    };

    // Responsive classes using Tailwind
    const responsiveClasses = `max-w-7xl mx-auto`;

    return (
        <>
            <div
                style={containerStyles}
                className="relative w-full"
            >
                {/* Background overlay for better text readability when using background images */}
                {finalBackground.backgroundImage && (
                    <div
                        className="absolute inset-0 bg-black bg-opacity-20 pointer-events-none"
                    />
                )}

                <div
                    style={innerContainerStyles}
                    className={`relative z-10 ${responsiveClasses.trim()}`}
                >
                    {/* Mobile-responsive container */}
                    <div className="w-full px-4 sm:px-6 lg:px-8 max-w-none sm:max-w-none lg:max-w-7xl">
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
        background={{
            backgroundColor: "#f8fafc"
        }}
        layout={{
            padding: "40px",
            paddingTop: "60px",
            paddingBottom: "60px"
        }}
        {...props}
    />
);

export const HeroPageWrapper = (props) => (
    <PageWrapper
        background={{
            backgroundColor: "#0f172a",
            backgroundGradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
        }}
        layout={{
            minHeight: "100vh",
            padding: "80px"
        }}
        {...props}
    />
);

export const ContentPageWrapper = (props) => (
    <PageWrapper
        background={{
            backgroundColor: "#ffffff"
        }}
        layout={{
            maxWidth: "800px",
            padding: "40px",
            paddingTop: "80px",
            paddingBottom: "80px"
        }}
        {...props}
    />
);

export default PageWrapper;
