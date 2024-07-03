import { useSafeMantineTheme } from '@mantine/core'
import classes from './HomeGallery.module.css'
import sanSebastian from './../assets/sanSebastian-min.jpg'
import airport from './../assets/airport-min.jpg'
import losAngeles from './../assets/losAngeles-min.jpg'
import chief from './../assets/chief-min.jpg'
import { useSpring, animated, easings } from '@react-spring/web'
import { useEffect } from 'react'

export default function HomeGallery() {

    const [springs, api] = useSpring( ()=> ({
        from: {y: -window.innerHeight},
        to: {y:0},
        config: {
            easing: easings.easeInBounce,
            velocity: 0.01,
            mass: 1.5,
        }
    }));

    

    return (
        <>
        <animated.div className={classes.galleryContainer}
        style={{
            ...springs
            }}>
            <img src={sanSebastian} alt="San sebastian" />
            <img src={chief} alt="The Chief mountain" />
            <img src={losAngeles} alt="Los Angeles" />
            <img src={airport} alt="Airport" />
        </animated.div>

        </>
    )
}