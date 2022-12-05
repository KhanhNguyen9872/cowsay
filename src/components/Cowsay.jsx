import { useEffect, useState, startTransition, useRef } from "react";
import { themeChange } from "theme-change";
import { moo } from "cowsayjs";
import { corral } from "cowsayjs/cows";
import { useToggle } from "react-use";
import Typed from "typed.js";
import quotes from "../data/quotes.json";
import TextareaAutosize from "react-textarea-autosize";
import clsx from "clsx";
import { GoMarkGithub } from "react-icons/go";

export default function () {
  // https://github.com/saadeghi/daisyui/blob/742f2807155cf496345e0f0b6d26fc17856b763a/src/docs/src/lib/data.js#L16
  const themes = [
    {
      name: "🌝 light",
      id: "light",
    },
    {
      name: "🌚 dark",
      id: "dark",
    },
    {
      name: "🧁 cupcake",
      id: "cupcake",
    },
    {
      name: "🐝 bumblebee",
      id: "bumblebee",
    },
    {
      name: "✳️ Emerald",
      id: "emerald",
    },
    {
      name: "🏢 Corporate",
      id: "corporate",
    },
    {
      name: "🌃 synthwave",
      id: "synthwave",
    },
    {
      name: "👴 retro",
      id: "retro",
    },
    {
      name: "🤖 cyberpunk",
      id: "cyberpunk",
    },
    {
      name: "🌸 valentine",
      id: "valentine",
    },
    {
      name: "🎃 halloween",
      id: "halloween",
    },
    {
      name: "🌷 garden",
      id: "garden",
    },
    {
      name: "🌲 forest",
      id: "forest",
    },
    {
      name: "🐟 aqua",
      id: "aqua",
    },
    {
      name: "👓 lofi",
      id: "lofi",
    },
    {
      name: "🖍 pastel",
      id: "pastel",
    },
    {
      name: "🧚‍♀️ fantasy",
      id: "fantasy",
    },
    {
      name: "📝 Wireframe",
      id: "wireframe",
    },
    {
      name: "🏴 black",
      id: "black",
    },
    {
      name: "💎 luxury",
      id: "luxury",
    },
    {
      name: "🧛‍♂️ dracula",
      id: "dracula",
    },
    {
      name: "🖨 CMYK",
      id: "cmyk",
    },
    {
      name: "🍁 Autumn",
      id: "autumn",
    },
    {
      name: "💼 Business",
      id: "business",
    },
    {
      name: "💊 Acid",
      id: "acid",
    },
    {
      name: "🍋 Lemonade",
      id: "lemonade",
    },
    {
      name: "🌙 Night",
      id: "night",
    },
    {
      name: "☕️ Coffee",
      id: "coffee",
    },
    {
      name: "❄️ Winter",
      id: "winter",
    },
  ];

  themes.unshift({
    name: "Theme",
    id: "",
  });

  const [state1, setState1] = useState();

  const [state2, setState2] = useState(window.innerWidth);

  const [toggle1, setToggle1] = useToggle(true);

  const [toggle2, setToggle2] = useToggle(false);

  const [toggle3, setToggle3] = useToggle(true);

  const ref1 = useRef();

  const refs = useRef([]);

  const className = { gap: { default: { xy: "gap-10", y: "gap-y-10" } } };

  const Fn = {
    handle: {
      array: {
        // https://1loc.completejavascript.com/snippets/array/shuffle-an-array
        shuffle: function (arr) {
          return arr
            .map((a) => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value);
        },
      },

      setState2: function () {
        setState2(window.innerWidth);
      },
    },

    components: {
      toast: {
        default: function (parameter) {
          return (
            <span className="badge-accent badge-outline badge">
              {parameter}
            </span>
          );
        },
      },
    },
  };

  // https://github.com/saadeghi/theme-change
  useEffect(() => {
    themeChange(false);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", Fn.handle.setState2);

    return () => window.removeEventListener("resize", Fn.handle.setState2);
  }, []);

  useEffect(() => {
    // https://mattboldt.github.io/typed.js/docs/
    new Typed(ref1.current, {
      strings: Fn.handle.array.shuffle(
        quotes.map((element) => `${element.content} — ${element.author}`)
      ),
      typeSpeed: 30,
      backSpeed: 20,
      attr: "placeholder",
      loop: true,
      showCursor: false,
    });
  }, []);

  return (
    <div className="container mx-auto">
      <div className={clsx("flex flex-col p-5", className.gap.default.y)}>
        <nav className="flex flex-row">
          <h1 className="grow self-center font-serif text-5xl font-semibold">
            Cowsay
          </h1>
          <select data-choose-theme className="self-end">
            {themes.map((element) => (
              <option value={element.id} key={element.id}>
                {element.id ? element.name.toLowerCase() : element.name}
              </option>
            ))}
          </select>
        </nav>

        <div className="indicator w-full">
          {state1 ? (
            <div className="indicator-bottom indicator-center indicator-item w-max">
              <div className="btn-group">
                <button className="btn-xs" onClick={setToggle2}>
                  {!toggle2 ? "Wrap" : "No wrap"}
                </button>
                <button className="btn-xs" onClick={setToggle1}>
                  {!toggle1 ? "Say" : "Think"}
                </button>
                {/* ?? */}
                {state2 >= 1024 ? (
                  <button className="btn-xs" onClick={setToggle3}>
                    {toggle3 ? "1 column" : "2 columns"}
                  </button>
                ) : undefined}
                <button
                  className="btn-xs"
                  onClick={() =>
                    window.open(
                      "https://github.com/shenlong616/cowsay",
                      "_blank"
                    )
                  }
                  title="GitHub"
                >
                  <GoMarkGithub />
                </button>
              </div>
            </div>
          ) : undefined}

          <TextareaAutosize
            className="w-full"
            ref={ref1}
            minRows={10}
            onChange={(event) => {
              startTransition(() => setState1(event.target.value));
            }}
            autoFocus
          />
        </div>

        {state1 ? (
          <div className={clsx("flex flex-col", className.gap.default.y)}>
            <div
              className={clsx("grid grid-cols-1", className.gap.default.xy, {
                ["lg:grid-cols-2"]: toggle3,
              })}
            >
              {corral.map((element, index) => (
                <div key={element.name} className="indicator w-full">
                  <div className="indicator-center indicator-bottom indicator-item w-max">
                    <span className="badge font-mono">{element.name}</span>
                  </div>

                  <textarea
                    // https://stackoverflow.com/questions/57810378/how-to-create-dynamic-refs-in-functional-component-using-useref-hook
                    ref={(ref) => (refs.current[index] = ref)}
                    className="w-full overflow-hidden whitespace-pre font-mono leading-none hover:overflow-auto focus:overflow-auto" // ??
                    value={moo(state1, {
                      cow: element.name,
                      wrap: toggle2,
                      action: toggle1 ? "say" : "think",
                    })}
                    rows={20}
                    onClick={() => refs.current[index].select()}
                    readOnly
                  />
                </div>
              ))}
            </div>

            <div className="self-center">
              {Fn.components.toast.default("(ง︡'-'︠)ง End page")}
            </div>
          </div>
        ) : (
          <div className="self-center">
            {Fn.components.toast.default(
              "(~˘▾˘)~ Please provide data text field"
            )}
          </div>
        )}
      </div>
    </div>
  );
}
