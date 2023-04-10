# Scroll Animation Package

A package containing utilities and predefined animations to help you implement scrolling animations.

## Usage

1. Wrap a `<ScrollProgressController>` around the area where you want to use the scroll animation to inject scroll-related context. You can put it in `App.tsx`, but since this component handles the scroll event, we recommend only using it on screens where it is needed.
2. Use the `useScrollProgress()` hook to connect the element you want to animate and animate it based on the value of progress.

See the storybook for code examples.

## Setting

### triggerHook

A number between 0 and 1 that determines how many times the ref element has appeared in the viewport before progress starts.

You can use the following aliases

- onEnter: when it starts to appear on the screen (triggerHook = 1)
- onCenter: when the top of the ref element appears in the center of the screen (triggerHook = 0.5)
- onLeave: when it starts to leave the screen (triggerHook = 0)

### duration

Determines how long the progress will be from when the trigger is started.

e.g..

- (progress = 200 or 200px): Until we scroll 200px
- (progress = 200%): until you've scrolled twice the size of the ref element
- (progress = 150vh): until scrolling 1.5 times the window height

## Predefined animations

### ScrollRevealAnimation

Play the animation below as the element passes through the 40% to 60% area of the screen.

- opacity changes from 0 to 1
- translateY changes from 100 to 0
