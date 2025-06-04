import tkinter as tk
import hashlib
import base64

class Application:
    def __init__(self, width=300, height=235):
        self.root = tk.Tk()
        self.root.geometry(f"{width}x{height}")
        self.root.config(bg="#88769c")
        self.root.resizable(0, 0)
        self.root.title("Password Generator")

        # create label
        label_text = "Enter some text:"
        self.label = tk.Label(self.root, text=label_text, bg="#88769c")
        self.label.pack(side="top", fill="x", pady=5)

        # create entry box
        self.entry = tk.Entry(self.root, width=width)
        self.entry.pack(padx=5)

        # create label
        label_text2 = "Enter your secret key:"
        self.label2 = tk.Label(self.root, text=label_text2, bg="#88769c")
        self.label2.pack(side="top", fill="x", pady=5)

        # create entry box
        self.entry2 = tk.Entry(self.root, width=width)
        self.entry2.pack(padx=5)

        self.encbutton = tk.Button(self.root, 
                                   text='Encode Secret Key', 
                                   command=self.make_key,
                                   width=width)
        self.encbutton.pack(padx=5, pady=10)

        self.makebutton = tk.Button(self.root, 
                                    text='Make Password', 
                                    command=self.make_password,
                                    width=width)
        self.makebutton.pack(padx=5)

        label_text = "Your password - copy and paste"
        self.label = tk.Label(self.root, text=label_text, bg="#88769c")
        self.label.pack(pady=5, side="top", fill="x")

        self.newpass = tk.Entry(self.root, justify=tk.CENTER, bg="#88769c", width=300, borderwidth=0, font=("Courier", 12))
        self.newpass.pack(padx=5, pady=5)

        self.root.mainloop()

    def make_password(self):
        self.newpass.delete(0, tk.END)
        text = self.entry.get().encode('utf-8') + self.entry2.get().encode('utf-8')
        passwd = self.encode(text)
        self.newpass.insert(0, passwd)

    def make_key(self):
        text = self.entry2.get().encode('utf-8')
        passwd = self.encode(text)
        self.entry2.delete(0, tk.END)
        self.entry2.insert(0, passwd)

    def encode(self, text):
        hashpass = hashlib.sha256(text).digest()
        passwd = base64.b64encode(hashpass).decode('utf-8')[:20]
        return passwd
        


if __name__ == '__main__':
    app = Application()
