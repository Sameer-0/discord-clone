/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals.push({
            "utf-8-validate": "commonjs utf-8-validate",
            bufferutil: "commonjs bufferutil"
        })

        return config;
    },
    images: {
        domains: ['images.unsplash.com', 'uploadthings.com', 'utfs.io'], 
    }
}

module.exports = nextConfig